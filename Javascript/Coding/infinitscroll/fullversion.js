// Get the HTML element where we will display the products
const productsContainer = document.getElementById('products');

// Get the HTML element at the bottom of the page.
// IntersectionObserver will watch this element.
// When it becomes visible, we will fetch more products.
const loader = document.getElementById('loader');


// Stores ALL products that have been loaded so far.
//
// Initially:
// []
//
// After first API call:
// [product1 ... product20]
//
// After second API call:
// [product1 ... product40]
//
// We APPEND new products instead of replacing the existing ones.
let products = [];


// `skip` tells the API how many records to skip.
//
// First request:
// skip = 0
// → get products 1-20
//
// Second request:
// skip = 20
// → get products 21-40
//
// Third request:
// skip = 40
// → get products 41-60
let skip = 0;


// Number of products we want from the API in each request.
const limit = 20;


// Indicates whether an API request is currently running.
//
// This is important because IntersectionObserver can trigger
// multiple times while the loader is visible.
//
// We don't want:
//
// Request 1 → page 2
// Request 2 → page 2  ❌
// Request 3 → page 2  ❌
//
// So while loading === true, we don't make another request.
let loading = false;


// Indicates whether the API has more products to give us.
//
// true  → continue fetching
// false → stop fetching
//
// Once we have loaded all products, we set this to false.
let hasMore = true;


// ============================================================
// FETCH PRODUCTS
// ============================================================

async function fetchProducts() {

  // Before making the API request, check two things:
  //
  // 1. Is another request already running?
  // 2. Have we already loaded all the products?
  //
  // If either is true, stop here.
  if (loading || !hasMore) {
    return;
  }


  // Mark the request as running.
  //
  // This prevents another IntersectionObserver event
  // from starting another request at the same time.
  loading = true;


  try {

    // Request the next batch of products.
    //
    // First request:
    // ?limit=20&skip=0
    //
    // Second request:
    // ?limit=20&skip=20
    //
    // Third request:
    // ?limit=20&skip=40
    //
    // So `skip` is effectively controlling which batch
    // of data we are requesting.
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    );


    // fetch() does NOT automatically throw an error for
    // HTTP errors such as 404 or 500.
    //
    // Therefore, we manually check response.ok.
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }


    // Convert the API response from JSON into a JavaScript object.
    //
    // The response will contain something similar to:
    //
    // {
    //   products: [...],
    //   total: 194,
    //   skip: 0,
    //   limit: 20
    // }
    const data = await response.json();


    // ========================================================
    // APPEND NEW PRODUCTS
    // ========================================================

    // IMPORTANT:
    //
    // We DON'T do:
    //
    // products = data.products;
    //
    // because that would REMOVE the previously loaded products.
    //
    // Instead we append the new products:
    //
    // Existing products + New products
    //
    // [1 ... 20] + [21 ... 40]
    //        ↓
    // [1 ... 40]
    //
    // The spread operator (...) creates a new array.
    products = [...products, ...data.products];


    // ========================================================
    // MOVE TO THE NEXT BATCH
    // ========================================================

    // Increase skip by the number of products we requested.
    //
    // Initially:
    // skip = 0
    //
    // After first request:
    // skip = 0 + 20 = 20
    //
    // After second request:
    // skip = 20 + 20 = 40
    //
    // After third request:
    // skip = 40 + 20 = 60
    //
    // This tells the API where the next batch should start.
    skip += limit;


    // ========================================================
    // DISPLAY PRODUCTS
    // ========================================================

    // After receiving the new products,
    // update the UI.
    renderProducts();


    // ========================================================
    // CHECK IF THERE IS MORE DATA
    // ========================================================

    // `data.total` tells us how many products exist in total.
    //
    // Example:
    //
    // total = 194
    //
    // If we have loaded:
    //
    // products.length = 194
    //
    // then there is nothing left to load.
    if (products.length >= data.total) {

      // Tell our application that there is no more data.
      //
      // Future calls to fetchProducts() will immediately return
      // because of:
      //
      // if (loading || !hasMore) return;
      hasMore = false;


      // Update the loader message for the user.
      loader.textContent = 'No more products';
    }


  } catch (error) {

    // If the API request fails,
    // we come here.
    console.error(error);

    // Show an error message in the loader area.
    loader.textContent = 'Something went wrong';


  } finally {

    // Whether the request succeeds OR fails,
    // we need to mark loading as false.
    //
    // Otherwise loading would remain true forever
    // and future requests would never happen.
    loading = false;
  }
}


// ============================================================
// RENDER PRODUCTS
// ============================================================

function renderProducts() {

  // Clear the existing HTML before rendering the complete list.
  //
  // Remember: `products` already contains ALL loaded products.
  //
  // So we render:
  //
  // products 1-20
  // then 1-40
  // then 1-60
  // etc.
  productsContainer.innerHTML = '';


  // Loop through every product currently stored in our array.
  products.forEach((product) => {

    // Create a new <div> for each product.
    const div = document.createElement('div');


    // Create the product HTML.
    div.innerHTML = `
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
    `;


    // Add the product element to the page.
    productsContainer.appendChild(div);
  });
}


// ============================================================
// INTERSECTION OBSERVER
// ============================================================

// IntersectionObserver allows us to detect when an element
// becomes visible in the viewport.
//
// Instead of listening to every scroll event, we simply say:
//
// "Watch the loader element and tell me when it becomes visible."
const observer = new IntersectionObserver(

  // This callback runs whenever the visibility
  // of the observed element changes.
  (entries) => {

    // `entries` is an array of observer entries.
    //
    // We are observing only one element,
    // so we take the first entry.
    const entry = entries[0];


    // `isIntersecting` means:
    //
    // Is the loader currently visible/intersecting
    // with the viewport?
    //
    // If yes, the user has reached near the bottom,
    // so we should fetch the next batch.
    if (entry.isIntersecting) {

      // Fetch the next batch of products.
      //
      // fetchProducts() itself will check:
      //
      // - Are we already loading?
      // - Do we still have more products?
      //
      // So duplicate requests are prevented there.
      fetchProducts();
    }
  },


  {
    // Start detecting the loader BEFORE it actually reaches
    // the viewport.
    //
    // `200px` means:
    //
    // "Start loading approximately 200px before the loader
    // becomes visible."
    //
    // This gives the API time to respond while the user
    // is still scrolling.
    rootMargin: '200px',
  },
);


// ============================================================
// START OBSERVING
// ============================================================

// Tell IntersectionObserver which element to watch.
//
// The observer is now watching:
//
// <div id="loader"></div>
//
// When that element becomes visible,
// the callback above will run.
observer.observe(loader);


// ============================================================
// INITIAL API CALL
// ============================================================

// The observer only helps us load SUBSEQUENT batches.
//
// We need to manually load the first batch when the page starts.
fetchProducts();
