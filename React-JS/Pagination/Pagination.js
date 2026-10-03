import { useEffect, useState } from 'react';
import './App.css';
function App() {
  //data
  const [products, setProducts] = useState([]);
  // currentPage
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPrduct, setTotalPrduct] = useState(0);
  // No of products per page
  const limit = 10;
  //loader
  const [loading, setLoading] = useState(false);
  //error
  const [error, setError] = useState(null);

  //fetchData function
  //useFetch
  useEffect(() => {
    fetchProductDetails();
  }, [currentPage]);

  async function fetchProductDetails() {
    try {
      //set loading true
      setLoading(true);
      const skip = (currentPage - 1) * limit;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      //adding products value to product array
      setProducts(data.products);
      //setting total number of product
      setTotalPrduct(data.total);
    } catch (e) {
      // set error in error state
      setError(e.message);
      // display error
      console.error(e);
    } finally {
      //set loading false
      setLoading(false);
    }
  }
  //The math.ceil() function rounds a number up to the next largest whole integer.
  // total number of pages
  const totalPages = Math.ceil(totalPrduct / limit);
  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }
  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }
  return (
    <div>
      {loading && <p>loading</p>}
      {!loading && (
        <div>
          <table border="1">
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
