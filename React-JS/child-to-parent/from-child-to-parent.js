Interview Answer:

To pass data from a child component to a parent component in React, you must use a callback function. 
Because data flow in React is unidirectional (strictly parent-to-child), the parent must pass a function down to the child as a prop. 
The child then calls this function and passes the data back up as an argument.

Steps to follow:

Parent component
1. Create a state variable to hold the incoming data from child component
2. Create a callback function to receive the data
3. Pass the callback function to the child as a prop 

Child Component:
1. Accept the function through its props.
2. Call it inside an event handler (like a button click or input change) and pass the data as an argument
  
import React, { useState } from 'react';
import Child from './Child';

export default function Parent() {
  //1. Create a state variable to hold the incoming data from child component
  const [message, setMessage] = useState('');
  // 2. Create a callback function to receive the data
  const handleclick = (datafromchild) => {
    setMessage(datafromchild);
  };
  return (
    <div>
      <p>{message}</p>
      {/* 3. Pass the callback function to the child as a prop */}
      <Child handleclick={handleclick} />
    </div>
  );
}

Child Component:

import React from 'react';

//1. Accept the function through its props.
export default function Child({ handleclick }) {
  //2. Call it inside an event handler (like a button click or input change) and pass the data as an argument
  const clickHandler = () => {
    handleclick('Hello');
  };
  return (
    <div>
      <button onClick={clickHandler}>Click Me</button>
    </div>
  );
}


