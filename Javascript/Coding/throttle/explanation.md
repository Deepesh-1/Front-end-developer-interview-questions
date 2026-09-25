Think about it like this

Imagine you click rapidly:

Time          Action
--------------------------------
0 ms          Click → ❌
100 ms        Click → ❌
200 ms        Click → ❌
500 ms        Click → ❌
999 ms        Click → ❌
1000 ms       Click → ✅ Execute
1100 ms       Click → ❌
1500 ms       Click → ❌
2000 ms       Click → ✅ Execute

Actually, with lastRun = 0, the first click will execute immediately because the current timestamp is much larger than 1000.

So more accurately:

First click   → ✅ Execute
100ms         → ❌ Ignore
300ms         → ❌ Ignore
800ms         → ❌ Ignore
1000ms later  → ✅ Execute

Now compare it with your React code

React:

const lastRun = useRef(0);

is conceptually doing the same job as:

let lastRun = 0;

And:

lastRun.current = now;

is conceptually:

lastRun = now;

The main difference is that React needs useRef to preserve the value between renders.

So for your interview, remember the core JavaScript concept first:

let lastRun = 0;

function throttleFunction() {
  const now = Date.now();

  if (now - lastRun >= 1000) {
    lastRun = now;

    // Execute function
  }
}

That's the essence of throttling.

Key takeaway

Throttling limits how frequently a function can execute within a given time interval.

For example, with a 1000ms throttle:

Multiple events
      ↓
  Throttle check
      ↓
┌─────┴─────┐
│           │
Too soon   1000ms passed
│           │
Ignore      Execute

The important part is that lastRun must persist between function calls.

In plain JavaScript, a variable outside the function can do this.

In React, useRef is useful because its value persists across renders without causing another render.
