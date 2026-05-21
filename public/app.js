const STORAGE_KEY_PRODUCTS = "ecommerce-products";
const STORAGE_KEY_CART = "ecommerce-cart";

// PRODUCTOS DIRECTAMENTE EMBEBIDOS
const initialProducts = [
  {"id": 1, "name": "Mania natural", "price": 15, "category": "Manias", "stock": 40},
  {"id": 2, "name": "Mania garapinada", "price": 15, "category": "Manias", "stock": 35},
  {"id": 3, "name": "Mania saladas", "price": 15, "category": "Manias", "stock": 30},
  {"id": 4, "name": "Mania limon", "price": 15, "category": "Manias", "stock": 28},
  {"id": 5, "name": "Mania picante", "price": 15, "category": "Manias", "stock": 25},
  {"id": 6, "name": "Choco max", "price": 20, "category": "Manias", "stock": 24},
  {"id": 7, "name": "Mania horneada", "price": 20, "category": "Manias", "stock": 32},
  {"id": 8, "name": "Mania japonesa", "price": 20, "category": "Manias", "stock": 22},
  {"id": 9, "name": "Mania japo. picante", "price": 25, "category": "Manias", "stock": 20},
  {"id": 10, "name": "Mix de la casa", "price": 20, "category": "Manias", "stock": 30},
  {"id": 11, "name": "Haba con cascara", "price": 25, "category": "Manias", "stock": 18},
  {"id": 12, "name": "Haba pelada", "price": 25, "category": "Manias", "stock": 18},
  {"id": 13, "name": "Haba pelada jalapeno", "price": 30, "category": "Manias", "stock": 15},
  {"id": 14, "name": "Chispas de chocolate", "price": 40, "category": "Manias", "stock": 14},
  {"id": 15, "name": "Choco menta", "price": 20, "category": "Manias", "stock": 19},
  {"id": 16, "name": "Coco Rallado", "price": 25, "category": "Manias", "stock": 17},
  {"id": 17, "name": "Mania triturada", "price": 10, "category": "Manias", "stock": 45},
  {"id": 18, "name": "Botonetas", "price": 15, "category": "Manias", "stock": 33},
  {"id": 19, "name": "Tajin", "price": 15, "category": "Manias", "stock": 21},
  {"id": 20, "name": "Pasas", "price": 15, "category": "Manias", "stock": 40},
  {"id": 21, "name": "Anicillo", "price": 15, "category": "Manias", "stock": 26},
  {"id": 22, "name": "Granola", "price": 15, "category": "Manias", "stock": 36},
  {"id": 23, "name": "Maranon", "price": 45, "category": "Especiales", "stock": 15},
  {"id": 24, "name": "Almendra", "price": 35, "category": "Especiales", "stock": 20},
  {"id": 25, "name": "Arandanos", "price": 30, "category": "Especiales", "stock": 18},
  {"id": 26, "name": "Macadamia", "price": 35, "category": "Especiales", "stock": 16},
  {"id": 27, "name": "Datiles", "price": 35, "category": "Especiales", "stock": 17},
  {"id": 28, "name": "Pistacho", "price": 45, "category": "Especiales", "stock": 12},
  {"id": 29, "name": "Pepitoria Dorada", "price": 35, "category": "Especiales", "stock": 23},
  {"id": 30, "name": "Nuez de Brasil", "price": 55, "category": "Especiales", "stock": 10},
  {"id": 31, "name": "Nuez pecana", "price": 50, "category": "Especiales", "stock": 11},
  {"id": 32, "name": "Nuez de nogal", "price": 45, "category": "Especiales", "stock": 12},
  {"id": 33, "name": "Mix de chispas", "price": 40, "category": "Especiales", "stock": 18},
  {"id": 34, "name": "Mix maranon, almendra, macadamia y arandano", "price": 40, "category": "Especiales", "stock": 15},
  {"id": 35, "name": "Cafe con chocolate", "price": 50, "category": "Cubiertos de chocolate", "stock": 14},
  {"id": 36, "name": "Maranon con chocolate", "price": 50, "category": "Cubiertos de chocolate", "stock": 12},
  {"id": 37, "name": "Almendra con chocolate", "price": 50, "category": "Cubiertos de chocolate", "stock": 12},
  {"id": 38, "name": "Macadamia chocolate", "price": 50, "category": "Cubiertos de chocolate", "stock": 10},
  {"id": 39, "name": "Arandanos chocolate", "price": 50, "category": "Cubiertos de chocolate", "stock": 13}
];

// Iconos para cada categoría
const categoryIcons = {
  "Manias": "🥜",
  "Especiales": "✨",
  "Cubiertos de chocolate": "🍫"
};

const state = {
  products: [],
  categories: [],
  cart: JSON.parse(localStorage.getItem(STORAGE_KEY_CART) || "{}"),
  currentCategory: null,
  searchQuery: "",
  sortBy: "name-asc"
};

const els = {
  categoriesGrid: document.querySelector("#categories-grid"),
  categoriesView: document.querySelector("#categories-view"),
  productsView: document.querySelector("#products-view"),
  productsGrid: document.querySelector("#products-grid"),
  backButton: document.querySelector("#back-to-categories"),
  currentCategoryName: document.querySelector("#current-category-name"),
  search: document.querySelector("#search"),
  sort: document.querySelector("#sort"),
  categoryToolbar: document.querySelector("#category-toolbar"),
  cartCount: document.querySelector("#cart-count"),
  cartTotalMini: document.querySelector("#cart-total-mini"),
  cartItems: document.querySelector("#cart-items"),
  cartSubtotal: document.querySelector("#cart-subtotal"),
  cartTotal: document.querySelector("#cart-total"),
  cartLines: document.querySelector("#cart-lines"),
  clearCart: document.querySelector("#clear-cart"),
  checkout: document.querySelector("#checkout"),
  cartBadge: document.querySelector("#cart-badge"),
  adminTable: document.querySelector("#admin-table"),
  adminBadge: document.querySelector("#admin-badge"),
  form: document.querySelector("#product-form"),
  productId: document.querySelector("#product-id"),
  productName: document.querySelector("#product-name"),
  productPrice: document.querySelector("#product-price"),
  productCategory: document.querySelector("#product-category"),
  productStock: document.querySelector("#product-stock"),
  categoryOptions: document.querySelector("#category-options"),
  cancelEdit: document.querySelector("#cancel-edit"),
  toast: document.querySelector("#toast"),
  navLinks: document.querySelectorAll(".nav-link")
};

const pages = ["home", "catalogo", "carrito", "admin"];

function setPage(page) {
  const target = pages.includes(page) ? page : "home";
  
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

  if (target === "catalogo") {
    state.currentCategory = null;
    state.searchQuery = "";
    state.sortBy = "name-asc";
    if (els.search) els.search.value = "";
    if (els.sort) els.sort.value = "name-asc";
    showCategoriesView();
    renderCategoriesGrid();
  }

  if (window.location.hash.slice(1) !== target) {
    window.history.replaceState(null, "", `#${target}`);
  }
}

function showCategoriesView() {
  if (els.categoriesView) els.categoriesView.classList.remove("hidden");
  if (els.productsView) els.productsView.classList.add("hidden");
}

function showProductsView(category) {
  if (els.categoriesView) els.categoriesView.classList.add("hidden");
  if (els.productsView) els.productsView.classList.remove("hidden");
  if (els.currentCategoryName) els.currentCategoryName.textContent = category;
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
  if (!els.toast) return;
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
  
  if (savedProducts) {
    state.products = JSON.parse(savedProducts);
  } else {
    state.products = [...initialProducts];
    saveProducts();
  }
  
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

function renderCategoriesGrid() {
  if (!els.categoriesGrid) return;
  
  els.categoriesGrid.innerHTML = "";
  
  const categoryCounts = {};
  state.products.forEach(product => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });
  
  state.categories.forEach((category) => {
    const count = categoryCounts[category] || 0;
    const icon = categoryIcons[category] || "📦";
    
    const card = document.createElement("article");
    card.className = "category-card";
    card.setAttribute("data-category", category);
    card.innerHTML = `
      <div class="category-icon">${icon}</div>
      <h3>${escapeHtml(category)}</h3>
      <p class="category-count">${count} ${count === 1 ? 'producto' : 'productos'}</p>
      <span class="arrow">→</span>
    `;
    
    card.addEventListener("click", () => {
      state.currentCategory = category;
      state.searchQuery = "";
      state.sortBy = "name-asc";
      if (els.search) els.search.value = "";
      if (els.sort) els.sort.value = "name-asc";
      showProductsView(category);
      renderProductsByCategory();
    });
    
    els.categoriesGrid.append(card);
  });
}

function getProductsByCurrentCategory() {
  if (!state.currentCategory) return [];
  
  let products = state.products.filter(
    (product) => product.category === state.currentCategory
  );
  
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    products = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }
  
  const [sort, direction] = state.sortBy.split("-");
  const factor = direction === "desc" ? -1 : 1;
  
  products.sort((a, b) => {
    if (sort === "price") return (a.price - b.price) * factor;
    return a.name.localeCompare(b.name, "es") * factor;
  });
  
  return products;
}

function renderProductsByCategory() {
  if (!els.productsGrid) return;
  
  const products = getProductsByCurrentCategory();
  els.productsGrid.innerHTML = "";
  
  if (!products.length) {
    els.productsGrid.innerHTML = '<p class="muted">No hay productos en esta familia.</p>';
    return;
  }
  
  products.forEach((product) => {
    const inCart = state.cart[product.id] || 0;
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <span class="pill">${escapeHtml(product.category)}</span>
      <div>
        <h3>${escapeHtml(product.name)}</h3>
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

function renderCategories() {
  if (els.categoryOptions) {
    els.categoryOptions.innerHTML = "";
    state.categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      els.categoryOptions.append(option);
    });
  }
}

function renderCart() {
  const { entries, units, total } = cartTotals();
  if (els.cartCount) els.cartCount.textContent = units;
  if (els.cartTotalMini) els.cartTotalMini.textContent = formatMoney(total);
  if (els.cartSubtotal) els.cartSubtotal.textContent = formatMoney(total);
  if (els.cartTotal) els.cartTotal.textContent = formatMoney(total);
  if (els.cartLines) els.cartLines.textContent = entries.length;
  if (els.cartBadge) {
    els.cartBadge.textContent = units;
    els.cartBadge.classList.toggle("has-items", units > 0);
  }
  if (!els.cartItems) return;
  
  els.cartItems.innerHTML = "";
  
  if (!entries.length) {
    els.cartItems.innerHTML = '<p class="muted">El carrito esta vacio. Agrega varios productos antes de comprar.</p>';
    if (els.checkout) els.checkout.disabled = true;
    return;
  }
  
  if (els.checkout) els.checkout.disabled = false;
  entries.forEach(({ product, quantity }) => {
    const item = document.createElement("article");
    item.className = "cart-item";
    item.innerHTML = `
      <div>
        <h3>${escapeHtml(product.name)}</h3>
        <span class="muted">${escapeHtml(product.category)} - ${formatMoney(product.price)} c/u</span>
      </div>
      <div class="quantity-control" aria-label="Cantidad de ${escapeHtml(product.name)}">
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
  if (!els.adminBadge) return;
  els.adminBadge.textContent = state.products.length;
  els.adminBadge.classList.toggle("has-items", state.products.length > 0);
  
  if (!els.adminTable) return;
  els.adminTable.innerHTML = "";
  
  state.products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(product.name)}</td>
      <td>${escapeHtml(product.category)}</td>
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
  renderCategoriesGrid();
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
  if (state.currentCategory) {
    renderProductsByCategory();
  }
  renderCart();
}

function changeQuantity(id, delta) {
  const product = getProduct(id);
  if (!product) return;
  
  const next = Math.min(product.stock, Math.max(0, (state.cart[id] || 0) + delta));
  if (next === 0) delete state.cart[id];
  else state.cart[id] = next;
  
  saveCart();
  if (state.currentCategory) {
    renderProductsByCategory();
  }
  renderCart();
}

function resetForm() {
  if (!els.form) return;
  els.form.reset();
  if (els.productId) els.productId.value = "";
}

function editProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  
  if (els.productId) els.productId.value = product.id;
  if (els.productName) els.productName.value = product.name;
  if (els.productPrice) els.productPrice.value = product.price;
  if (els.productCategory) els.productCategory.value = product.category;
  if (els.productStock) els.productStock.value = product.stock;
  if (els.productName) els.productName.focus();
}

function saveProduct(event) {
  event.preventDefault();
  const id = els.productId ? els.productId.value : '';
  const payload = {
    name: els.productName ? els.productName.value : '',
    price: Number(els.productPrice ? els.productPrice.value : 0),
    category: els.productCategory ? els.productCategory.value : '',
    stock: Number(els.productStock ? els.productStock.value : 0)
  };
  
  if (id) {
    const product = getProduct(Number(id));
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
  state.categories = getCategories(state.products);
  renderAll();
  if (state.currentCategory) {
    renderProductsByCategory();
  }
}

function deleteProduct(id) {
  const product = getProduct(id);
  if (!product) return;
  
  const confirmed = window.confirm(`Eliminar ${product.name}?`);
  if (!confirmed) return;
  
  state.products = state.products.filter((item) => item.id !== id);
  delete state.cart[id];
  saveCart();
  saveProducts();
  state.categories = getCategories(state.products);
  showToast("Producto eliminado.");
  renderAll();
  if (state.currentCategory) {
    const categoryStillExists = state.categories.includes(state.currentCategory);
    if (!categoryStillExists) {
      state.currentCategory = null;
      showCategoriesView();
      renderCategoriesGrid();
    } else {
      renderProductsByCategory();
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function bindEvents() {
  if (els.backButton) {
    els.backButton.addEventListener("click", () => {
      state.currentCategory = null;
      showCategoriesView();
      renderCategoriesGrid();
    });
  }
  
  if (els.search) {
    els.search.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (state.currentCategory) {
        renderProductsByCategory();
      }
    });
  }
  
  if (els.sort) {
    els.sort.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      if (state.currentCategory) {
        renderProductsByCategory();
      }
    });
  }
  
  if (els.productsGrid) {
    els.productsGrid.addEventListener("click", (event) => {
      const id = event.target.dataset.add;
      if (id) addToCart(Number(id));
    });
  }
  
  if (els.cartItems) {
    els.cartItems.addEventListener("click", (event) => {
      const inc = event.target.dataset.inc;
      const dec = event.target.dataset.dec;
      const remove = event.target.dataset.remove;
      
      if (inc) changeQuantity(Number(inc), 1);
      if (dec) changeQuantity(Number(dec), -1);
      if (remove) {
        delete state.cart[remove];
        saveCart();
        if (state.currentCategory) renderProductsByCategory();
        renderCart();
      }
    });
  }
  
  if (els.clearCart) {
    els.clearCart.addEventListener("click", () => {
      state.cart = {};
      saveCart();
      if (state.currentCategory) renderProductsByCategory();
      renderCart();
    });
  }
  
  if (els.checkout) {
    els.checkout.addEventListener("click", () => {
      const { units, total } = cartTotals();
      showToast(`Compra lista: ${units} unidades por ${formatMoney(total)}.`);
    });
  }
  
  if (els.form) {
    els.form.addEventListener("submit", saveProduct);
  }
  
  if (els.cancelEdit) {
    els.cancelEdit.addEventListener("click", resetForm);
  }
  
  if (els.adminTable) {
    els.adminTable.addEventListener("click", (event) => {
      const edit = event.target.dataset.edit;
      const remove = event.target.dataset.delete;
      if (edit) editProduct(Number(edit));
      if (remove) deleteProduct(Number(remove));
    });
  }
  
  els.navLinks.forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.page));
  });
  
  window.addEventListener("hashchange", () => setPage(window.location.hash.slice(1)));
}

window.setPage = setPage;

document.addEventListener('DOMContentLoaded', () => {
  bindEvents();
  setPage(window.location.hash.slice(1) || "home");
  loadData();
});