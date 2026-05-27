const STORAGE_KEY_PRODUCTS = "ecommerce-products";
const STORAGE_KEY_CART = "ecommerce-cart";

// MAPEO DE IMÁGENES PARA CADA PRODUCTO
const productImages = {
  "Mania natural": "mania-natural.jpg",
  "Mania garapinada": "mania-garapinada.jpg",
  "Mania saladas": "mania-saladas.jpg",
  "Mania limon": "mania-limon.jpg",
  "Mania picante": "mania-picante.jpg",
  "Choco max": "chocomax.jpg",
  "Mania horneada": "mania-horneada.jpg",
  "Mania japonesa": "mania-japonesa.jpg",
  "Mania japo. picante": "mania-japo-picante.jpg",
  "Mix de la casa": "mix-de-la-casa.jpg",
  "Haba con cascara": "haba-con-cascara.jpg",
  "Haba pelada": "haba-pelada.jpg",
  "Haba pelada jalapeno": "haba-pelada-jalapeno.jpg",
  "Chispas de chocolate": "chispas.png",
  "Choco menta": "chocomenta.jpg",
  "Coco Rallado": "manias-coco-rallado.jpg",
  "Mania triturada": "mania-triturada.png",
  "Botonetas": "botonetas.jpg",
  "Tajin": "tajin.jpg",
  "Pasas": "pasas.jpg",
  "Anicillo": "granola.jpg",
  "Granola": "granola.jpg",
  "Maranon": "maranon.jpg",
  "Almendra": "maranon.jpg",
  "Arandanos": "arandano.jpg",
  "Macadamia": "macadamia.jpg",
  "Datiles": "datiles.jpg",
  "Pistacho": "pistacho.jpg",
  "Pepitoria Dorada": "pepitoria-dorada.jpg",
  "Nuez de Brasil": "nuez-de-brasil.jpg",
  "Nuez pecana": "nuez-pecana.jpg",
  "Nuez de nogal": "nuez de nogal.jpg",
  "Mix de chispas": "mix-de-chispas.jpg",
  "Mix maranon, almendra, macadamia y arandano": "mix-maranon-almendra-macadamia-arandano.jpg",
  "Cafe con chocolate": "cafe-con-chocolate.jpg",
  "Maranon con chocolate": "maranon-con-chocolate.jpg",
  "Almendra con chocolate": "chocolate.jpg",
  "Macadamia chocolate": "macadamia-chocolate.jpg",
  "Arandanos chocolate": "arandano-chocolate.jpg"
};

// MAPEO DE IMÁGENES PARA CATEGORÍAS
const categoryImages = {
  "Manias": "manias.png",
  "Especiales": "especiales.png",
  "Cubiertos de chocolate": "chocolate.jpg"
};

// PRODUCTOS
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

const state = {
  products: [],
  categories: [],
  cart: {},
  currentCategory: null,
  searchQuery: "",
  sortBy: "name-asc"
};

// Función para obtener la ruta de la imagen del producto
function getProductImage(productName) {
  const imageFile = productImages[productName];
  if (imageFile) {
    return `/assets/${imageFile}`;
  }
  return `/assets/logo.png`;
}

// Función para obtener la ruta de la imagen de la categoría
function getCategoryImage(categoryName) {
  const imageFile = categoryImages[categoryName];
  if (imageFile) {
    return `/assets/${imageFile}`;
  }
  return `/assets/logo.png`;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2000);
}

function updateBadges() {
  const cartTotal = Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
  const cartBadge = document.getElementById('cart-badge');
  const adminBadge = document.getElementById('admin-badge');
  if (cartBadge) cartBadge.textContent = cartTotal;
  if (adminBadge) adminBadge.textContent = state.products.length;
}

function renderCategoriesGrid() {
  const categoriesGrid = document.getElementById('categories-grid');
  if (!categoriesGrid) return;
  
  categoriesGrid.innerHTML = '';
  
  const counts = {};
  state.products.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });
  
  state.categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    const catImage = getCategoryImage(cat);
    card.innerHTML = `
      <img src="${catImage}" alt="${cat}" class="category-image" onerror="this.src='/assets/logo.png'">
      <h3>${escapeHtml(cat)}</h3>
      <p class="category-count">${counts[cat]} productos</p>
      <span class="arrow">→</span>
    `;
    card.onclick = () => {
      state.currentCategory = cat;
      document.getElementById('categories-view').classList.add('hidden');
      document.getElementById('products-view').classList.remove('hidden');
      document.getElementById('current-category-name').textContent = cat;
      renderProductsByCategory();
    };
    categoriesGrid.appendChild(card);
  });
}

function renderProductsByCategory() {
  const productsGrid = document.getElementById('products-grid');
  if (!productsGrid || !state.currentCategory) return;
  
  let products = state.products.filter(p => p.category === state.currentCategory);
  
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q));
  }
  
  const [sort, dir] = state.sortBy.split('-');
  const factor = dir === 'desc' ? -1 : 1;
  products.sort((a, b) => {
    if (sort === 'price') return (a.price - b.price) * factor;
    return a.name.localeCompare(b.name) * factor;
  });
  
  productsGrid.innerHTML = '';
  
  if (products.length === 0) {
    productsGrid.innerHTML = '<p class="muted">No hay productos en esta familia.</p>';
    return;
  }
  
  products.forEach(product => {
    const inCart = state.cart[product.id] || 0;
    const productImage = getProductImage(product.name);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${productImage}" alt="${escapeHtml(product.name)}" class="product-image" onerror="this.src='/assets/logo.png'">
      <span class="pill">${escapeHtml(product.category)}</span>
      <div>
        <h3>${escapeHtml(product.name)}</h3>
        <p>Presentacion de 1/2 libra</p>
      </div>
      <div class="price-row">
        <span class="price">Q${product.price.toFixed(2)}</span>
        <span class="stock">${product.stock} en stock</span>
      </div>
      <button data-id="${product.id}" ${product.stock <= inCart ? 'disabled' : ''}>
        ${product.stock <= inCart ? 'Sin stock disponible' : 'Agregar al carrito'}
      </button>
    `;
    productsGrid.appendChild(card);
  });
  
  document.querySelectorAll('#products-grid button[data-id]').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const product = state.products.find(p => p.id === id);
      if (!product) return;
      
      const current = state.cart[id] || 0;
      if (current >= product.stock) {
        showToast("No hay más stock disponible");
        return;
      }
      
      state.cart[id] = current + 1;
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
      renderProductsByCategory();
      updateBadges();
      showToast("Agregado al carrito");
    };
  });
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  const cartLines = document.getElementById('cart-lines');
  const clearCart = document.getElementById('clear-cart');
  const checkout = document.getElementById('checkout');
  
  if (!cartItems) return;
  
  const entries = Object.entries(state.cart)
    .map(([id, quantity]) => ({ product: state.products.find(p => p.id === parseInt(id)), quantity }))
    .filter(item => item.product && item.quantity > 0);
  
  const units = entries.reduce((sum, item) => sum + item.quantity, 0);
  const total = entries.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  if (cartSubtotal) cartSubtotal.textContent = `Q${total.toFixed(2)}`;
  if (cartTotal) cartTotal.textContent = `Q${total.toFixed(2)}`;
  if (cartLines) cartLines.textContent = entries.length;
  
  cartItems.innerHTML = '';
  
  if (entries.length === 0) {
    cartItems.innerHTML = '<p class="muted">El carrito esta vacio.</p>';
    if (checkout) checkout.disabled = true;
    return;
  }
  
  if (checkout) checkout.disabled = false;
  
  entries.forEach(({ product, quantity }) => {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
      <div>
        <h3>${escapeHtml(product.name)}</h3>
        <span class="muted">${escapeHtml(product.category)} - Q${product.price.toFixed(2)} c/u</span>
      </div>
      <div class="quantity-control">
        <button data-dec="${product.id}">-</button>
        <span>${quantity}</span>
        <button data-inc="${product.id}" ${quantity >= product.stock ? 'disabled' : ''}>+</button>
      </div>
      <button class="danger-button" data-remove="${product.id}">Quitar</button>
    `;
    cartItems.appendChild(item);
  });
  
  document.querySelectorAll('[data-dec]').forEach(btn => {
    btn.onclick = () => changeQuantity(parseInt(btn.dataset.dec), -1);
  });
  document.querySelectorAll('[data-inc]').forEach(btn => {
    btn.onclick = () => changeQuantity(parseInt(btn.dataset.inc), 1);
  });
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.onclick = () => {
      delete state.cart[btn.dataset.remove];
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
      renderCart();
      updateBadges();
      if (state.currentCategory) renderProductsByCategory();
    };
  });
  
  if (clearCart) {
    clearCart.onclick = () => {
      state.cart = {};
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
      renderCart();
      updateBadges();
      if (state.currentCategory) renderProductsByCategory();
    };
  }
  
  if (checkout) {
    checkout.onclick = () => showToast(`Compra lista: ${units} unidades por Q${total.toFixed(2)}`);
  }
}

function changeQuantity(id, delta) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;
  
  const current = state.cart[id] || 0;
  const next = Math.min(product.stock, Math.max(0, current + delta));
  
  if (next === 0) delete state.cart[id];
  else state.cart[id] = next;
  
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
  renderCart();
  updateBadges();
  if (state.currentCategory) renderProductsByCategory();
}

function renderAdminTable() {
  const adminTable = document.getElementById('admin-table');
  if (!adminTable) return;
  
  adminTable.innerHTML = '';
  
  state.products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${escapeHtml(product.name)}</td>
      <td>${escapeHtml(product.category)}</td>
      <td>Q${product.price.toFixed(2)}</td>
      <td>${product.stock}</td>
      <td>
        <div class="table-actions">
          <button class="secondary-button" data-edit="${product.id}">Editar</button>
          <button class="danger-button" data-delete="${product.id}">Eliminar</button>
        </div>
      </td>
    `;
    adminTable.appendChild(row);
  });
  
  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.onclick = () => editProduct(parseInt(btn.dataset.edit));
  });
  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.onclick = () => deleteProduct(parseInt(btn.dataset.delete));
  });
}

function editProduct(id) {
  const product = state.products.find(p => p.id === id);
  if (!product) return;
  
  document.getElementById('product-id').value = product.id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-category').value = product.category;
  document.getElementById('product-stock').value = product.stock;
}

function deleteProduct(id) {
  if (!confirm('¿Eliminar este producto?')) return;
  
  state.products = state.products.filter(p => p.id !== id);
  delete state.cart[id];
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(state.products));
  localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(state.cart));
  state.categories = [...new Set(state.products.map(p => p.category))];
  
  if (state.currentCategory && !state.categories.includes(state.currentCategory)) {
    state.currentCategory = null;
    document.getElementById('categories-view').classList.remove('hidden');
    document.getElementById('products-view').classList.add('hidden');
  }
  
  renderAll();
  showToast('Producto eliminado');
}

function saveProduct(event) {
  event.preventDefault();
  
  const id = document.getElementById('product-id').value;
  const name = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const category = document.getElementById('product-category').value;
  const stock = parseInt(document.getElementById('product-stock').value);
  
  if (!name || !category || isNaN(price) || isNaN(stock)) {
    showToast('Complete todos los campos');
    return;
  }
  
  if (id) {
    const index = state.products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      state.products[index] = { ...state.products[index], name, price, category, stock };
      showToast('Producto actualizado');
    }
  } else {
    const newId = Math.max(...state.products.map(p => p.id), 0) + 1;
    state.products.push({ id: newId, name, price, category, stock });
    showToast('Producto creado');
  }
  
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(state.products));
  state.categories = [...new Set(state.products.map(p => p.category))];
  
  document.getElementById('product-form').reset();
  document.getElementById('product-id').value = '';
  
  renderAll();
  if (state.currentCategory) renderProductsByCategory();
}

function renderCategories() {
  const categoryOptions = document.getElementById('category-options');
  if (categoryOptions) {
    categoryOptions.innerHTML = '';
    state.categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      categoryOptions.appendChild(option);
    });
  }
}

function renderAll() {
  renderCategories();
  renderCategoriesGrid();
  renderCart();
  renderAdminTable();
  updateBadges();
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

function init() {
  const savedCart = localStorage.getItem(STORAGE_KEY_CART);
  if (savedCart) state.cart = JSON.parse(savedCart);
  
  const savedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  if (savedProducts) {
    state.products = JSON.parse(savedProducts);
  } else {
    state.products = [...initialProducts];
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(state.products));
  }
  
  state.categories = [...new Set(state.products.map(p => p.category))];
  
  renderAll();
  
  document.getElementById('back-to-categories').onclick = () => {
    state.currentCategory = null;
    document.getElementById('categories-view').classList.remove('hidden');
    document.getElementById('products-view').classList.add('hidden');
    document.getElementById('search').value = '';
    state.searchQuery = '';
    renderCategoriesGrid();
  };
  
  document.getElementById('search').oninput = (e) => {
    state.searchQuery = e.target.value;
    if (state.currentCategory) renderProductsByCategory();
  };
  
  document.getElementById('sort').onchange = (e) => {
    state.sortBy = e.target.value;
    if (state.currentCategory) renderProductsByCategory();
  };
  
  document.getElementById('product-form').addEventListener('submit', saveProduct);
  document.getElementById('cancel-edit').onclick = () => {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
  };
}

window.setPage = function(page) {
  const pages = ['home', 'catalogo', 'carrito', 'admin'];
  const target = pages.includes(page) ? page : 'home';
  
  pages.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    const button = document.querySelector(`[data-page="${sectionId}"]`);
    if (section) section.classList.toggle('hidden', sectionId !== target);
    if (button) button.classList.toggle('active', sectionId === target);
  });
  
  if (target === 'catalogo') {
    const categoriesView = document.getElementById('categories-view');
    const productsView = document.getElementById('products-view');
    if (categoriesView) categoriesView.classList.remove('hidden');
    if (productsView) productsView.classList.add('hidden');
    renderCategoriesGrid();
  }
  
  window.location.hash = target;
};

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1) || 'home';
  window.setPage(hash);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

if (window.location.hash) {
  window.setPage(window.location.hash.slice(1));
} else {
  window.setPage('home');
}