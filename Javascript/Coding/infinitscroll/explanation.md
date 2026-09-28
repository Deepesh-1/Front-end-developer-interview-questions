## Whole concept:

Page loads
    │
    ▼
fetchProducts()
    │
    ▼
skip = 0, limit = 20
    │
    ▼
API returns 20 products
    │
    ▼
products = [...products, ...newProducts]
    │
    ▼
renderProducts()
    │
    ▼
User scrolls
    │
    ▼
Loader becomes visible
    │
    ▼
IntersectionObserver fires
    │
    ▼
fetchProducts()
    │
    ▼
skip = 20
    │
    ▼
API returns next 20
    │
    ▼
Append to existing products
    │
    ▼
renderProducts()
    │
    ▼
User scrolls again
    │
    ▼
skip = 40
    │
    ▼
...


## The 5 things you should remember for the interview

// 1. Store all loaded data
let products = [];

// 2. Know where the next batch starts
let skip = 0;

// 3. Prevent duplicate API requests
let loading = false;

// 4. Know when to stop
let hasMore = true;

// 5. Detect when the user reaches the bottom
const observer = new IntersectionObserver(...);

And the core infinite-scroll logic is really just:

fetch → append → increase skip → observe bottom → fetch again
