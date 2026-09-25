// Throttling limits how frequently a function can execute.
// Even if an event fires many times, the function executes at most once within a specified interval.

//Typical use cases: 
// - scroll events, 
// - mouse movement,
// - resize events, 
// - button clicks, 
// - API calls triggered by rapidly occurring events.

// Store the time of the last execution.
  let lastRun = 0;

  // Function we want to throttle.
  function handleClick() {

    // Current time.
    const now = Date.now();

    // 1 second.
    const throttleTime = 10000;

    // Has 1 second passed?
    if (now - lastRun >= throttleTime) {

      // Remember this execution time.
      lastRun = now;

      // Perform the actual operation.
      console.log("Function executed");
    }
  }

  // Run handleClick whenever the button is clicked.
  document
    .getElementById("btn")
    .addEventListener("click", handleClick);
