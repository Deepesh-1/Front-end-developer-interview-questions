import { useState, useEffect, useRef } from 'react';
const LIMIT = 20;
function App() {
  //states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasmore, setHasmore] = useState(true);
  const [error, setError] = useState('');
  const [skip, setSkip] = useState(0);
  const loaderRef = useRef(null);
  async function fetchData() {
    if (loading || !hasmore) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const userdata = await response.json();
      setData((prev) => [...prev, ...userdata.products]);
      setSkip((prev) => prev + LIMIT);
      if (skip + userdata.products.length >= userdata.total) {
        setHasmore(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    //observer create
    const loader = loaderRef.current;
    if (!loader) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        fetchData();
      }
    });
    observer.observe(loader);
    return () => {
      observer.disconnect();
    };
  }, [hasmore, skip, loading]);
  {
    error && <div>{error}</div>;
  }
  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      {hasmore && <div ref={loaderRef}>Loading..</div>}
      {!hasmore && <div>No more products</div>}
    </>
  );
}

export default App;
