**🟨 1. What is Pagination?**
**Pagination means:**
Instead of displaying all records at once, display a small number of records per page 
and allow the user to move between pages.

___________________________________________________________________________________________

API has 100 products
        ↓
Show 10 products per page
        ↓
Page 1 → Products 1–10
Page 2 → Products 11–20
Page 3 → Products 21–30
...
Page 10 → Products 91–100

___________________________________________________________________________________________

<img width="558" height="476" alt="image" src="https://github.com/user-attachments/assets/2d55d025-64bb-4593-a440-57b115afd791" />

___________________________________________________________________________________________

limit = 10
totalPage = 0
totalPrducts = data.total
totalPage = Math.ceil(totalProducts/limit)   The math.ceil() function rounds a number up to the next largest whole integer.
totalPage = Math.ceil(194/10) = Math.ceil(19.4) = 20 pages
currentpage is set to 1
skip = (currentPage-1) multiply limit 
fetch(`/products?limit=${limit}&skip=${skip}`);
Initially: (1-1)* 10 = 0, 
onNext click: 10,20,30
onPrevious click:30, 20, 10
next page => currentPage + 1 if currentPage < totalPage 
Prev page => currentPage - 1 if currentPage > 1
Prev page button disable={currentPage===1}
Next page button disable={currentPage===totalPage}
{currentPage} of {totalPage}

___________________________________________________________________________________________

              USER
               │
               ↓
        Click "Next"
               │
               ↓
    setCurrentPage(2)
               │
               ↓
       React re-renders
               │
               ↓
      useEffect runs
               │
               ↓
       fetchProducts()
               │
               ↓
   skip = (2 - 1) × 10
               │
               ↓
         skip = 10
               │
               ↓
          API Request
               │
               ↓
       Products 11–20
               │
               ↓
       setProducts(...)
               │
               ↓
         UI updates


1) Which page am I on?
       ↓
   currentPage

2) How many records per page?
       ↓
   pageSize(limit)

3) How many records exist?
       ↓
   totalPrducts

4) Which records should API return?
       ↓
   skip = (page - 1) × pageSize
 we are using:  skip = (currentPage - 1) × limit

5) How many pages exist?
       ↓
   Math.ceil(total / pageSize)
 we are using: Math.ceil(totalProducts/limit) 

7) what happens if i click next?
       ↓
 currentPage + 1 if currentPage < totalPage

8) what happens if i click previous?
       ↓
Prev page => currentPage - 1 if currentPage > 1

9) what happens if i click previous when currentPage is 1?
       ↓
we kept disabled={currentPage===1} on previous button property so it will be disabled

10) what happens if i click next when currentPage is last page?
       ↓
we kept disabled={currentPage===totalPage} on next button property so it will be disabled

<img width="850" height="714" alt="image" src="https://github.com/user-attachments/assets/5f9f9f9a-7d03-43eb-af67-fe142ab58e3c" />

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/5dfda8ee-08d6-43d8-980b-c6c201e597a2" />










          
