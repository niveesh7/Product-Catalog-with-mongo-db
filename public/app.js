const API_URL = '/api/products';
const form = document.getElementById('productForm');
const list = document.getElementById('productList');

// Fetch products from API
async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${p.name} - $${p.price}</span>
      <button onclick="deleteProduct('${p._id}')">🗑️</button>
    `;
    list.appendChild(li);
  });
}

// Add new product
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const product = {
    name: document.getElementById('name').value,
    price: parseFloat(document.getElementById('price').value),
    description: document.getElementById('description').value
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  form.reset();
  loadProducts();
});

// Delete product
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadProducts();
}

// Load products on page load
loadProducts();
