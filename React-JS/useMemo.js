// In React, the useMemo hook is used to memoize the result of a function call and recompute it only when its dependencies change. 

// Memoization is a technique used to optimize performance by caching the result of a function call so that the function doesn't have to be re-executed with the same arguments.

// The useMemo hook takes two arguments: a function that returns the value you want to memoize, and an array of dependencies. 

// The function will be executed only when any of the dependencies change. If none of the dependencies have changed, the cached value is returned instead.

// Here's an example of how to use useMemo:

import React, { useMemo } from 'react';

function expensiveFunction(a, b) {
  console.log('Executing expensive function');
  return a + b;
}

function MyComponent(props) {
  const { x, y } = props;

  const result = useMemo(() => {
    return expensiveFunction(x, y);
  }, [x, y]);

  return <div>{result}</div>;
}

// In this example, the expensiveFunction is executed every time the component re-renders, even if the values of x and y haven't changed. 
// By wrapping the function with useMemo, the function is only executed when x or y changes.
// This can help improve the performance of your application by avoiding unnecessary re-execution of functions.
