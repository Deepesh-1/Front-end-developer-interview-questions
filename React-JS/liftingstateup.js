In React, "lifting state up" is the process of moving the state from a child component to a parent component in order to share the state between multiple components. 
Here's a simple example of how to lift state up in React:

import React from 'react';

const Counter = (props) => {
  return (
    <div>
      <p>Count: {props.count}</p>
      <button onClick={props.increment}>Increment</button>
    </div>
  );
};

const App = () => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <Counter count={count} increment={increment} />
    </div>
  );
};

export default App;

In this example, the Counter component is a simple component that displays the current count and a button to increment the count. 
The App component is the parent component that owns the state for the count.

In the App component, the count state is defined using the useState hook with an initial value of 0. The increment function is defined to update the count state when the button is clicked.

The Counter component is rendered inside the App component with the count and increment props passed as arguments. This allows the Counter component to display the current count and provide a way to increment the count, but the state is still owned by the App component.

By lifting the state up to the parent component, we can now easily share the state between multiple child components if needed. This pattern is particularly useful when you have multiple components that need access to the same data or state.
