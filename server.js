const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = Number(process.env.PORT || 8000);
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_FILE = path.join(ROOT, "data", "products.json");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Payload demasiado grande"));
      }
    });
    req.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("JSON invalido"));
      }
    });
    req.on("error", reject);
  });
}

async function readProducts() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeProducts(products) {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf8");
}

function normalizeProduct(input, existing = {}) {
  const name = String(input.name ?? existing.name ?? "").trim();
  const category = String(input.category ?? existing.category ?? "").trim();
  const price = Number(input.price ?? existing.price);
  const stock = Number(input.stock ?? existing.stock ?? 0);

  if (!name) return { error: "El nombre es requerido." };
  if (!category) return { error: "La categoria es requerida." };
  if (!Number.isFinite(price) || price < 0) return { error: "El precio debe ser un numero positivo." };
  if (!Number.isInteger(stock) || stock < 0) return { error: "El stock debe ser un entero positivo." };

  return {
    product: {
      ...existing,
      name,
      category,
      price,
      stock
    }
  };
}

function filterAndSortProducts(products, searchParams) {
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const category = (searchParams.get("category") || "").trim();
  const sort = searchParams.get("sort") || "name";
  const direction = searchParams.get("direction") === "desc" ? "desc" : "asc";

  let result = [...products];

  if (q) {
    result = result.filter((product) =>
      [product.name, product.category].some((value) => value.toLowerCase().includes(q))
    );
  }

  if (category) {
    result = result.filter((product) => product.category === category);
  }

  const directionFactor = direction === "desc" ? -1 : 1;
  result.sort((a, b) => {
    if (sort === "price") return (a.price - b.price) * directionFactor;
    if (sort === "category") {
      return a.category.localeCompare(b.category, "es") * directionFactor ||
        a.name.localeCompare(b.name, "es");
    }
    return a.name.localeCompare(b.name, "es") * directionFactor;
  });

  return result;
}

async function handleApi(req, res, url) {
  const products = await readProducts();
  const productMatch = url.pathname.match(/^\/api\/products\/([^/]+)$/);

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (url.pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true, service: "ecommerce-api" });
    return;
  }

  if (url.pathname === "/api/categories" && req.method === "GET") {
    const categories = [...new Set(products.map((product) => product.category))].sort((a, b) =>
      a.localeCompare(b, "es")
    );
    sendJson(res, 200, categories);
    return;
  }

  if (url.pathname === "/api/products" && req.method === "GET") {
    sendJson(res, 200, filterAndSortProducts(products, url.searchParams));
    return;
  }

  if (url.pathname === "/api/products" && req.method === "POST") {
    const body = await readBody(req);
    const normalized = normalizeProduct(body);
    if (normalized.error) {
      sendJson(res, 400, { error: normalized.error });
      return;
    }

    const nextId = products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
    const product = { id: nextId, ...normalized.product };
    products.push(product);
    await writeProducts(products);
    sendJson(res, 201, product);
    return;
  }

  if (productMatch && req.method === "GET") {
    const id = Number(productMatch[1]);
    const product = products.find((item) => item.id === id);
    if (!product) {
      sendJson(res, 404, { error: "Producto no encontrado." });
      return;
    }

    sendJson(res, 200, product);
    return;
  }

  if (productMatch && req.method === "PUT") {
    const id = Number(productMatch[1]);
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) {
      sendJson(res, 404, { error: "Producto no encontrado." });
      return;
    }

    const body = await readBody(req);
    const normalized = normalizeProduct(body, products[index]);
    if (normalized.error) {
      sendJson(res, 400, { error: normalized.error });
      return;
    }

    products[index] = { ...normalized.product, id };
    await writeProducts(products);
    sendJson(res, 200, products[index]);
    return;
  }

  if (productMatch && req.method === "DELETE") {
    const id = Number(productMatch[1]);
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) {
      sendJson(res, 404, { error: "Producto no encontrado." });
      return;
    }

    const [deleted] = products.splice(index, 1);
    await writeProducts(products);
    sendJson(res, 200, deleted);
    return;
  }

  sendJson(res, 404, { error: "Endpoint no encontrado." });
}

async function serveStatic(req, res, url) {
  const requestedPath = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": contentTypes[ext] || "application/octet-stream" });
    res.end(file);
  } catch {
    const index = await fs.readFile(path.join(PUBLIC_DIR, "index.html"));
    res.writeHead(200, { "Content-Type": contentTypes[".html"] });
    res.end(index);
  }
}

function createServer() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    try {
      if (url.pathname.startsWith("/api/")) {
        await handleApi(req, res, url);
        return;
      }

      await serveStatic(req, res, url);
    } catch (error) {
      sendJson(res, 500, { error: error.message || "Error interno del servidor." });
    }
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`Ecommerce listo en http://localhost:${PORT}`);
  });
}

module.exports = { createServer };
