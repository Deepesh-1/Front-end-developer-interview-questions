import { useState, useRef } from "react";
// useState -> stores React state.
// useRef -> stores a value that persists between renders
//           without causing a re-render.

// Main React component.
export default function App() {

  // State to store how many times our throttled function executed.
  const [count, setCount] = useState(0);

  // useRef stores the timestamp of the last execution.
  //
  // Unlike useState, changing lastRun.current does NOT
  // cause the component to re-render.
  const lastRun = useRef(0);

  // This function is called whenever the user clicks the button.
  const handleClick = () => {

    // Get the current time in milliseconds.
    const now = Date.now();

    // Define how often the function is allowed to execute.
    // 1000 milliseconds = 1 second.
    const throttleTime = 1000;

    // Check how much time has passed since the last execution.
    if (now - lastRun.current >= throttleTime) {

      // Update the timestamp of the last execution.
      lastRun.current = now;

      // Execute our actual logic.
      setCount((prevCount) => prevCount + 1);
    }
  };

  // Return the UI.
  return (
    <div>

      {/* Display the current count. */}
      <h2>Count: {count}</h2>

      {/*
        When the user clicks this button,
        handleClick() will be called.

        Even if the user clicks many times quickly,
        the function will execute at most once
        every 1 second.
      */}
      <button onClick={handleClick}>
        Click Me
      </button>

    </div>
  );
}
