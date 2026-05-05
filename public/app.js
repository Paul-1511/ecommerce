const STORAGE_KEY_PRODUCTS = "ecommerce-products";
const STORAGE_KEY_CART = "ecommerce-cart";

const initialProducts = [
  { id: 1, name: "Mania natural", price: 15, category: "Manias", stock: 40 },
  { id: 2, name: "Mania garapinada", price: 15, category: "Manias", stock: 35 },
  { id: 3, name: "Mania saladas", price: 15, category: "Manias", stock: 30 },
  { id: 4, name: "Mania limon", price: 15, category: "Manias", stock: 28 },
  { id: 5, name: "Mania picante", price: 15, category: "Manias", stock: 25 },
  { id: 6, name: "Choco max", price: 20, category: "Manias", stock: 24 },
  { id: 7, name: "Mania horneada", price: 20, category: "Manias", stock: 32 },
  { id: 8, name: "Mania japonesa", price: 20, category: "Manias", stock: 22 },
  { id: 9, name: "Mania japo. picante", price: 25, category: "Manias", stock: 20 },
  { id: 10, name: "Mix de la casa", price: 20, category: "Manias", stock: 30 },
  { id: 11, name: "Haba con cascara", price: 25, category: "Manias", stock: 18 },
  { id: 12, name: "Haba pelada", price: 25, category: "Manias", stock: 18 },
  { id: 13, name: "Haba pelada jalapeno", price: 30, category: "Manias", stock: 15 },
  { id: 14, name: "Chispas de chocolate", price: 40, category: "Manias", stock: 14 },
  { id: 15, name: "Choco menta", price: 20, category: "Manias", stock: 19 },
  { id: 16, name: "Coco Rallado", price: 25, category: "Manias", stock: 17 },
  { id: 17, name: "Mania triturada", price: 10, category: "Manias", stock: 45 },
  { id: 18, name: "Botonetas", price: 15, category: "Manias", stock: 33 },
  { id: 19, name: "Tajin", price: 15, category: "Manias", stock: 21 },
  { id: 20, name: "Pasas", price: 15, category: "Manias", stock: 40 },
  { id: 21, name: "Anicillo", price: 15, category: "Manias", stock: 26 },
  { id: 22, name: "Granola", price: 15, category: "Manias", stock: 36 },
  { id: 23, name: "Maranon", price: 45, category: "Especiales", stock: 15 },
  { id: 24, name: "Almendra", price: 35, category: "Especiales", stock: 20 },
  { id: 25, name: "Arandanos", price: 30, category: "Especiales", stock: 18 },
  { id: 26, name: "Macadamia", price: 35, category: "Especiales", stock: 16 },
  { id: 27, name: "Datiles", price: 35, category: "Especiales", stock: 17 },
  { id: 28, name: "Pistacho", price: 45, category: "Especiales", stock: 12 },
  { id: 29, name: "Pepitoria Dorada", price: 35, category: "Especiales", stock: 23 },
  { id: 30, name: "Nuez de Brasil", price: 55, category: "Especiales", stock: 10 },
  { id: 31, name: "Nuez pecana", price: 50, category: "Especiales", stock: 11 },
  { id: 32, name: "Nuez de nogal", price: 45, category: "Especiales", stock: 12 },
  { id: 33, name: "Mix de chispas", price: 40, category: "Especiales", stock: 18 },
  { id: 34, name: "Mix maranon, almendra, macadamia y arandano", price: 40, category: "Especiales", stock: 15 },
  { id: 35, name: "Cafe con chocolate", price: 50, category: "Cubiertos de chocolate", stock: 14 },
  { id: 36, name: "Maranon con chocolate", price: 50, category: "Cubiertos de chocolate", stock: 12 },
  { id: 37, name: "Almendra con chocolate", price: 50, category: "Cubiertos de chocolate", stock: 12 },
  { id: 38, name: "Macadamia chocolate", price: 50, category: "Cubiertos de chocolate", stock: 10 },
  { id: 39, name: "Arandanos chocolate", price: 50, category: "Cubiertos de chocolate", stock: 13 }
];

const state = {
  products: [],
  categories: [],
  cart: JSON.parse(localStorage.getItem(STORAGE_KEY_CART) || "{}")
};

const els = {
  productsGrid: document.querySelector("#products-grid"),
  productCount: document.querySelector("#product-count"),
  cartCount: document.querySelector("#cart-count"),
  cartTotalMini: document.querySelector("#cart-total-mini"),
  cartItems: document.querySelector("#cart-items"),
  cartSubtotal: document.querySelector("#cart-subtotal"),
  cartTotal: document.querySelector("#cart-total"),
  cartLines: document.querySelector("#cart-lines"),
  search: document.querySelector("#search"),
  categoryFilter: document.querySelector("#category-filter"),
  sort: document.querySelector("#sort"),
  clearCart: document.querySelector("#clear-cart"),
  checkout: document.querySelector("#checkout"),
  adminTable: document.querySelector("#admin-table"),
  form: document.querySelector("#product-form"),
  productId: document.querySelector("#product-id"),
  productName: document.querySelector("#product-name"),
  productPrice: document.querySelector("#product-price"),
  productCategory: document.querySelector("#product-category"),
  productStock: document.querySelector("#product-stock"),
  categoryOptions: document.querySelector("#category-options"),
  cancelEdit: document.querySelector("#cancel-edit"),
  toast: document.querySelector("#toast"),
  navLinks: document.querySelectorAll(".nav-link"),
  cartBadge: document.querySelector("#cart-badge"),
  adminBadge: document.querySelector("#admin-badge")
};

const pages = ["catalogo", "carrito", "admin"];

function setPage(page) {
  const target = pages.includes(page) ? page : "catalogo";
  pages.forEach((sectionId) => {
    const section = document.querySelector(`#${sectionId}`);
    const button = document.querySelector(`[data-page="${sectionId}"]`);
    const active = sectionId === target;

    if (section) section.classList.toggle("hidden", !active);
    if (button) {
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    }
  });

  if (window.location.hash.slice(1) !== target) {
    window.history.replaceState(null, "", `#${target}`);
  }
}

const money = new Intl.NumberFormat("es-GT", {
  style: "currency",
  currency: "GTQ"
});

function formatMoney(value) {
  return money.format(value).replace("GTQ", "Q");
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => els.toast.classList.remove("visible"), 2400);
}

function getCategories(products) {
  return [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b, "es")
  );
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(state.products));
}

function loadData() {
  const savedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  state.products = savedProducts ? JSON.parse(savedProducts) : [...initialProducts];
  saveProducts();
  state.categories = getCategories(state.products);
  renderAll();
}

function getProduct(id) {
  return state.products.find((product) => product.id === Number(id));
}

function cartEntries() {
  return Object.entries(state.cart)
    .map(([id, quantity]) => ({ product: getProduct(id), quantity }))
    .filter((item) => item.product && item.quantity > 0);
}

function cartTotals() {
  const entries = cartEntries();
  const units = entries.reduce((sum, item) => sum + item.quantity, 0);
  const total = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { entries, units, total };
}

function renderCategories() {
  els.categoryFilter.innerHTML = '<option value="">Todas las categorias</option>';
  els.categoryOptions.innerHTML = "";

  state.categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    els.categoryFilter.append(option);

    const datalistOption = document.createElement("option");
    datalistOption.value = category;
    els.categoryOptions.append(datalistOption);
  });
}

function filteredProducts() {
  const query = els.search.value.trim().toLowerCase();
  const selectedCategory = els.categoryFilter.value;
  const [sort, direction] = els.sort.value.split("-");

  return [...state.products]
    .filter((product) => {
      const matchesQuery = [product.name, product.category].some((value) =>
        value.toLowerCase().includes(query)
      );
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      const factor = direction === "desc" ? -1 : 1;
      if (sort === "price") return (a.price - b.price) * factor;
      if (sort === "category") {
        return a.category.localeCompare(b.category, "es") * factor || a.name.localeCompare(b.name, "es");
      }
      return a.name.localeCompare(b.name, "es") * factor;
    });
}

function renderProducts() {
  const products = filteredProducts();
  els.productCount.textContent = state.products.length;
  els.productsGrid.innerHTML = "";

  if (!products.length) {
    els.productsGrid.innerHTML = '<p class="muted">No hay productos que coincidan con la busqueda.</p>';
    return;
  }

  products.forEach((product) => {
    const inCart = state.cart[product.id] || 0;
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <span class="pill">${product.category}</span>
      <div>
        <h3>${product.name}</h3>
        <p>Presentacion de 1/2 libra</p>
      </div>
      <div class="price-row">
        <span class="price">${formatMoney(product.price)}</span>
        <span class="stock">${product.stock} en stock</span>
      </div>
      <button data-add="${product.id}" ${product.stock <= inCart ? "disabled" : ""}>
        ${product.stock <= inCart ? "Sin stock disponible" : "Agregar al carrito"}
      </button>
    `;
    els.productsGrid.append(card);
  });
}

function renderCart() {
  const { entries, units, total } = cartTotals();
  els.cartCount.textContent = units;
  els.cartTotalMini.textContent = formatMoney(total);
  els.cartSubtotal.textContent = formatMoney(total);
  els.cartTotal.textContent = formatMoney(total);
  els.cartLines.textContent = entries.length;
  els.cartBadge.textContent = units;
  els.cartBadge.classList.toggle("has-items", units > 0);
  els.cartItems.innerHTML = "";

  if (!entries.length) {
    els.cartItems.innerHTML = '<p class="muted">El carrito esta vacio. Agrega varios productos antes de comprar.</p>';
    els.checkout.disabled = true;
    return;
  }

  els.checkout.disabled = false;
  entries.forEach(({ product, quantity }) => {
    const item = document.createElement("article");
    item.className = "cart-item";
    item.innerHTML = `
      <div>
        <h3>${product.name}</h3>
        <span class="muted">${product.category} - ${formatMoney(product.price)} c/u</span>
      </div>
      <div class="quantity-control" aria-label="Cantidad de ${product.name}">
        <button type="button" data-dec="${product.id}">-</button>
        <span>${quantity}</span>
        <button type="button" data-inc="${product.id}" ${quantity >= product.stock ? "disabled" : ""}>+</button>
      </div>
      <button class="danger-button" type="button" data-remove="${product.id}">Quitar</button>
    `;
    els.cartItems.append(item);
  });
}

function renderAdminTable() {
  els.adminBadge.textContent = state.products.length;
  els.adminBadge.classList.toggle("has-items", state.products.length > 0);
  els.adminTable.innerHTML = "";

  state.products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${formatMoney(product.price)}</td>
      <td>${product.stock}</td>
      <td>
        <div class="table-actions">
          <button class="secondary-button" type="button" data-edit="${product.id}">Editar</button>
          <button class="danger-button" type="button" data-delete="${product.id}">Eliminar</button>
        </div>
      </td>
    `;
    els.adminTable.append(row);
  });
}

function renderAll() {
  renderCategories();
  renderProducts();
  renderCart();
  renderAdminTable();
}

function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;

  const current = state.cart[id] || 0;
  if (current >= product.stock) {
    showToast("No hay mas stock disponible para este producto.");
    return;
  }

  state.cart[id] = current + 1;
  saveCart();
  renderProducts();
  renderCart();
}

function changeQuantity(id, delta) {
  const product = getProduct(id);
  if (!product) return;

  const next = Math.min(product.stock, Math.max(0, (state.cart[id] || 0) + delta));
  if (next === 0) delete state.cart[id];
  else state.cart[id] = next;

  saveCart();
  renderProducts();
  renderCart();
}

function resetForm() {
  els.form.reset();
  els.productId.value = "";
}

function editProduct(id) {
  const product = getProduct(id);
  if (!product) return;

  els.productId.value = product.id;
  els.productName.value = product.name;
  els.productPrice.value = product.price;
  els.productCategory.value = product.category;
  els.productStock.value = product.stock;
  els.productName.focus();
}

async function saveProduct(event) {
  event.preventDefault();
  const id = els.productId.value;
  const payload = {
    name: els.productName.value,
    price: Number(els.productPrice.value),
    category: els.productCategory.value,
    stock: Number(els.productStock.value)
  };

  if (id) {
    const product = getProduct(id);
    if (product) {
      Object.assign(product, payload);
      showToast("Producto actualizado.");
    }
  } else {
    const nextId = state.products.reduce((max, product) => Math.max(max, product.id), 0) + 1;
    state.products.push({ id: nextId, ...payload });
    showToast("Producto creado.");
  }

  resetForm();
  saveProducts();
  loadData();
}

async function deleteProduct(id) {
  const product = getProduct(id);
  if (!product) return;

  const confirmed = window.confirm(`Eliminar ${product.name}?`);
  if (!confirmed) return;

  state.products = state.products.filter((item) => item.id !== id);
  delete state.cart[id];
  saveCart();
  saveProducts();
  showToast("Producto eliminado.");
  loadData();
}

function bindEvents() {
  [els.search, els.categoryFilter, els.sort].forEach((input) => {
    input.addEventListener("input", renderProducts);
  });

  els.productsGrid.addEventListener("click", (event) => {
    const id = event.target.dataset.add;
    if (id) addToCart(Number(id));
  });

  els.cartItems.addEventListener("click", (event) => {
    const inc = event.target.dataset.inc;
    const dec = event.target.dataset.dec;
    const remove = event.target.dataset.remove;

    if (inc) changeQuantity(Number(inc), 1);
    if (dec) changeQuantity(Number(dec), -1);
    if (remove) {
      delete state.cart[remove];
      saveCart();
      renderProducts();
      renderCart();
    }
  });

  els.clearCart.addEventListener("click", () => {
    state.cart = {};
    saveCart();
    renderProducts();
    renderCart();
  });

  els.checkout.addEventListener("click", () => {
    const { units, total } = cartTotals();
    showToast(`Compra lista: ${units} unidades por ${formatMoney(total)}.`);
  });

  els.form.addEventListener("submit", (event) => {
    saveProduct(event).catch((error) => showToast(error.message));
  });

  els.cancelEdit.addEventListener("click", resetForm);

  els.adminTable.addEventListener("click", (event) => {
    const edit = event.target.dataset.edit;
    const remove = event.target.dataset.delete;
    if (edit) editProduct(Number(edit));
    if (remove) deleteProduct(Number(remove)).catch((error) => showToast(error.message));
  });

  els.navLinks.forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });

  window.addEventListener("hashchange", () => setPage(window.location.hash.slice(1)));
}

bindEvents();
setPage(window.location.hash.slice(1) || "catalogo");
loadData().catch((error) => showToast(error.message));
