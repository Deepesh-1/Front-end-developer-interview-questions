Yes. For interview revision, I'd keep it to one page. This is enough:

# React Infinite Scroll

                  USER
                   │
                   ↓
                SCROLL
                   │
                   ↓
          Loader enters viewport
                   │
                   ↓
        IntersectionObserver
                   │
                   ↓
          isIntersecting?
             │           │
            NO          YES
             │           │
             ↓           ↓
           STOP      fetchData()
                         │
                         ↓
                 loading / hasmore
                         │
                    ┌────┴────┐
                    │         │
                   STOP    Continue
                              │
                              ↓
                         API Request
                              │
                         limit = 20
                         skip = 20
                              │
                              ↓
                        API Response
                              │
                    ┌─────────┴─────────┐
                    ↓                   ↓
                products              total
                    │                   │
                    ↓                   ↓
              append data          check hasMore
                    │
                    ↓
            skip += products.length
                    │
                    ↓
               Render more
                    │
                    ↓
                User scrolls
                    │
                    └──────────────→ Repeat

## 1. Concept

Infinite scroll automatically loads the next batch of data when the user
reaches the bottom of the current list.

```text
Initial Load
     ↓
Fetch API
     ↓
Render Products
     ↓
Bottom Sentinel Visible
     ↓
IntersectionObserver
     ↓
Fetch Next Batch
     ↓
Append Products
     ↓
Repeat
     ↓
No More Data → Stop

**2. Architecture**

        React Component
              │
              ▼
         fetchData()
              │
              ▼
        REST API
   limit + skip
              │
              ▼
      API Response
              │
              ▼
    setData(prev => [...prev, ...new])
              │
              ▼
         Render List
              │
              ▼
       Loader / Sentinel
              │
              ▼
    IntersectionObserver
              │
              └──────→ fetchData()
              
**3. Main State**
data       // Loaded products
loading    // Prevent duplicate requests
hasmore    // Stop when all data is loaded
error      // API error
skip       // Current offset
Pagination
limit = 20

skip = 0   → products 1-20
skip = 20  → products 21-40
skip = 40  → products 41-60

Infinite scroll still uses pagination internally; it just hides the
pagination controls from the user.

**4. IntersectionObserver**
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    fetchData();
  }
});

We observe a sentinel:

<div ref={loaderRef}>Loading...</div>

When the sentinel enters the viewport → fetch next batch.

Why IntersectionObserver?

Instead of continuously handling:

window.addEventListener('scroll', ...)

the browser tells us when the element becomes visible.

**5. Important Guards**
if (loading || !hasmore) {
  return;
}
loading

Prevents multiple API requests at the same time.

hasmore

Stops fetching when all records are loaded.

**6. Append Data**
setData((prev) => [
  ...prev,
  ...userdata.products
]);

Important: append, don't replace.

Existing: [1,2,3,4,5]
New:      [6,7,8]

Result:   [1,2,3,4,5,6,7,8]

**7. End of Data**
if (skip + products.length >= total) {
  setHasmore(false);
}

Once all records are loaded:

hasmore = false
      ↓
Stop API calls
      ↓
Show "No more products"

**8. useRef**
const loaderRef = useRef(null);

Used to get the DOM element that IntersectionObserver watches.

useRef is appropriate because changing the DOM reference doesn't need
a React re-render.

**9. Important Interview Concept — Stale Closure**

fetchData() uses changing values:

loading
hasmore
skip

If an observer is created only once with:

useEffect(() => {
   ...
}, []);

it can hold an older version of fetchData.

This is called a stale closure.

Production solutions:

useRef
   OR
useCallback

**10. Interview Answer**

"I use IntersectionObserver with a sentinel element at the bottom of the
list. Initially I fetch data using limit and skip. When the sentinel enters
the viewport, I fetch the next batch and append it to the existing state.
Loading prevents duplicate requests and hasMore stops fetching when all
records are loaded. I also clean up the observer when the component
unmounts."

Key Terms
Infinite Scroll
IntersectionObserver
Sentinel
useRef
useEffect
useState
limit / skip
loading
hasMore
Stale Closure
useCallback
Cursor Pagination
Virtualization
