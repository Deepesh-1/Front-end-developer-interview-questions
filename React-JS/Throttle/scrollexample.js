import React, { useState, useRef, useEffect } from 'react';
import './App.css';

export default function App() {
  // const [count, setCount] = useState(0);
  const lastRun = useRef(0);
  useEffect(() => {
    function handleClick() {
      const now = Date.now();
      const throttle = 5000;
      if (now - lastRun.current >= throttle) {
        lastRun.current = now;
        // setCount((prev) => prev + 1);
        console.log('scrollY', window.scrollY);
      }
    }
    window.addEventListener('scroll', handleClick);
    return () => {
      window.removeEventListener('scroll', handleClick);
    };
  }, []);

  return (
    <>
      {/* <button onClick={handleClick} className="App">
        Click Me!
      </button> */}
      {/* <span>{count}</span> */}
      <div style={{ height: '2000px' }}>
        <h1>Scroll the page</h1>
      </div>
    </>
  );
}
