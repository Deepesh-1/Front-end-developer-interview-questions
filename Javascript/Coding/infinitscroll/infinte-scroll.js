const productsContainer = document.getElementById('products');
const loader = document.getElementById('loader');

let products = [];

let skip = 0;
const limit = 20;

let loading = false;
let hasMore = true;

// Fetch products
async function fetchProducts() {
  // Prevent duplicate requests
  if (loading || !hasMore) {
    return;
  }

  loading = true;

  try {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    // Append new products
    products = [...products, ...data.products];

    // Move to next batch
    skip += limit;

    // Render products
    renderProducts();

    // Check if we have loaded everything
    if (products.length >= data.total) {
      hasMore = false;

      loader.textContent = 'No more products';
    }
  } catch (error) {
    console.error(error);

    loader.textContent = 'Something went wrong';
  } finally {
    loading = false;
  }
}

// Render products
function renderProducts() {
  productsContainer.innerHTML = '';

  products.forEach((product) => {
    const div = document.createElement('div');

    div.innerHTML = `
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
    `;

    productsContainer.appendChild(div);
  });
}

// Observe loader
const observer = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      fetchProducts();
    }
  },
  {
    rootMargin: '200px',
  },
);

// Start observing
observer.observe(loader);

// Initial API call
fetchProducts();
