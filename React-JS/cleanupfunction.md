React useEffect Cleanup Function

📌 What is a Cleanup Function?

A cleanup function is a function returned from useEffect().

It is used to undo or release side effects created by the effect.

useEffect(() => {
  // Setup / side effect
  return () => {
    // Cleanup
  };
}, []);

Simple Mental Model

useEffect
    │
    ↓
  SETUP
    │
    │
    ├── Dependency changes ──→ CLEANUP → New SETUP
    │
    └── Component unmounts ──→ CLEANUP

⸻

1. Why Do We Need Cleanup?

Some side effects create resources that continue running outside React’s normal rendering.

Examples:

* setInterval
* setTimeout
* Event listeners
* WebSocket connections
* Subscriptions
* IntersectionObserver
* ResizeObserver
* External library instances
* API requests that can be cancelled

If we don’t clean them up, they can continue running unnecessarily.

Example

useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);
}, []);

If the component unmounts, the interval may still exist.

Correct version

useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);
  return () => {
    clearInterval(timer);
  };
}, []);

⸻

2. When Does Cleanup Run?

There are two major situations.

A. Before the Effect Runs Again

If a dependency changes:

useEffect(() => {
  console.log("Subscribe:", userId);
  return () => {
    console.log("Unsubscribe:", userId);
  };
}, [userId]);

Suppose:

userId = 1

React:

Effect
 ↓
Subscribe to user 1

Then:

userId = 2

React:

Cleanup
 ↓
Unsubscribe user 1
 ↓
New Effect
 ↓
Subscribe user 2

Important

Previous Cleanup
       ↓
New Effect

Not:

New Effect
       ↓
Previous Cleanup

⸻

3. Cleanup When Component Unmounts

Consider:

useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

Lifecycle:

Component mounts
       ↓
useEffect runs
       ↓
Add event listener
       ↓
Component is active
       ↓
Component unmounts
       ↓
Cleanup runs
       ↓
Remove event listener

⸻

4. Event Listener Cleanup

❌ Incorrect

useEffect(() => {
  window.addEventListener("resize", () => {
    console.log("resize");
  });
  return () => {
    window.removeEventListener("resize", () => {
      console.log("resize");
    });
  };
}, []);

Why?

Because these are two different function references.

Function A → addEventListener
Function B → removeEventListener
A !== B

✅ Correct

useEffect(() => {
  const handleResize = () => {
    console.log("resize");
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

Interview Point

removeEventListener() must receive the same function reference that was passed to addEventListener().

⸻

5. setInterval Cleanup

useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running...");
  }, 1000);
  return () => {
    clearInterval(timer);
  };
}, []);

Flow

Effect
  ↓
setInterval()
  ↓
Timer running
  ↓
Unmount
  ↓
clearInterval()

⸻

6. setTimeout Cleanup

useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Executed");
  }, 5000);
  return () => {
    clearTimeout(timer);
  };
}, []);

Cleanup:

return () => {
  clearTimeout(timer);
};

⸻

7. Subscription Cleanup

Suppose we subscribe to an external store:

useEffect(() => {
  const unsubscribe = store.subscribe(() => {
    console.log("Store updated");
  });
  return () => {
    unsubscribe();
  };
}, []);

Notice that unsubscribe itself is the cleanup function.

Subscribe
    ↓
Receive updates
    ↓
Unmount / dependency change
    ↓
Unsubscribe

⸻

8. WebSocket Cleanup

useEffect(() => {
  const socket = new WebSocket("wss://example.com");
  socket.onmessage = (event) => {
    console.log(event.data);
  };
  return () => {
    socket.close();
  };
}, []);

Without cleanup:

Component unmounts
        ↓
❌ WebSocket may remain connected

With cleanup:

Component unmounts
        ↓
socket.close()

⸻

9. API Request Cleanup

Modern applications may need to cancel an API request when it is no longer relevant.

Use AbortController.

useEffect(() => {
  const controller = new AbortController();
  fetch("/api/products", {
    signal: controller.signal
  })
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });
  return () => {
    controller.abort();
  };
}, []);

Flow

Component mounts
      ↓
Create AbortController
      ↓
Start API request
      ↓
Component unmounts
      ↓
Cleanup
      ↓
controller.abort()
      ↓
Request cancelled

Important Interview Point

Don’t say:

“Cleanup prevents API calls.”

More accurately:

Cleanup can cancel an in-flight request when that request is no longer relevant.

⸻

10. IntersectionObserver Cleanup

This is particularly useful for infinite scrolling.

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore();
    }
  });
  if (loaderRef.current) {
    observer.observe(loaderRef.current);
  }
  return () => {
    observer.disconnect();
  };
}, []);

Without:

observer.disconnect();

the observer may continue observing unnecessarily.

⸻

11. ResizeObserver Cleanup

useEffect(() => {
  const observer = new ResizeObserver(() => {
    console.log("Element resized");
  });
  if (elementRef.current) {
    observer.observe(elementRef.current);
  }
  return () => {
    observer.disconnect();
  };
}, []);

⸻

12. Dependency Changes + Cleanup

Consider:

useEffect(() => {
  const connection = connectToRoom(roomId);
  return () => {
    connection.disconnect();
  };
}, [roomId]);

Suppose:

roomId = "room-1"
Effect
 ↓
Connect room-1

Then:

roomId = "room-2"

React performs:

Disconnect room-1
        ↓
Connect room-2

This prevents multiple active connections.

⸻

13. Cleanup Captures Previous Values

This is an important JavaScript closure concept.

useEffect(() => {
  console.log("Subscribe:", userId);
  return () => {
    console.log("Cleanup:", userId);
  };
}, [userId]);

If:

userId = 10

then later:

userId = 20

Cleanup prints:

Cleanup: 10

Then the new effect prints:

Subscribe: 20

Why?

Because the cleanup function closes over the values from the effect that created it.

⸻

14. Cleanup Does NOT Run Before First Effect

For:

useEffect(() => {
  console.log("Effect");
  return () => {
    console.log("Cleanup");
  };
}, []);

Initial mount:

Effect

There is no previous effect to clean up.

Later:

Unmount
 ↓
Cleanup

⸻

15. Not Every useEffect Needs Cleanup

This is an important interview point.

useEffect(() => {
  document.title = "Dashboard";
}, []);

There is nothing to clean up.

Don’t create unnecessary cleanup functions.

Rule

If the effect creates something that needs to be stopped, removed, disconnected, unsubscribed, or cancelled, use cleanup.

⸻

16. Cleanup Should Undo What Setup Did

Think of every effect as a pair:

Setup	Cleanup
addEventListener	removeEventListener
setInterval	clearInterval
setTimeout	clearTimeout
subscribe	unsubscribe
WebSocket	close
observer.observe()	observer.disconnect()
fetch()	AbortController.abort()
Connect	Disconnect

Interview Mental Model

SETUP
  ↓
Do something outside React
  ↓
CLEANUP
  ↓
Undo that thing

⸻

17. Don’t Make Cleanup Async

❌ Avoid

useEffect(() => {
  return async () => {
    await cleanupSomething();
  };
}, []);

Instead, use a synchronous cleanup mechanism where possible.

For example:

return () => {
  controller.abort();
};

⸻

18. Avoid Unnecessary State Updates in Cleanup

Avoid using cleanup as a normal state-management mechanism:

useEffect(() => {
  return () => {
    setLoading(false);
  };
}, []);

Cleanup should primarily release or reverse external side effects.

Think:

Effect → Setup external resource
Cleanup → Release external resource

⸻

19. React Strict Mode

In development, React Strict Mode may intentionally perform:

Effect
 ↓
Cleanup
 ↓
Effect

This can make developers think:

“Why is my effect running twice?”

The purpose is to expose effects that aren’t resilient to being started and cleaned up correctly.

Therefore, your effects should be written so that:

Setup → Cleanup → Setup

is safe.

⸻

20. Cleanup Should Be Safe / Idempotent

For example:

return () => {
  clearInterval(timer);
};

Calling clearInterval() on an already-cleared timer is harmless.

Similarly:

return () => {
  observer.disconnect();
};

The cleanup should safely undo the resource created by the effect.

⸻

21. Complete Example

import { useEffect, useState } from "react";
function UserComponent({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const handleResize = () => {
      console.log(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    fetch(`/api/users/${userId}`, {
      signal: controller.signal
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
    return () => {
      window.removeEventListener("resize", handleResize);
      controller.abort();
    };
  }, [userId]);
  return (
    <div>
      {user && <h2>{user.name}</h2>}
    </div>
  );
}
export default UserComponent;

Here the effect creates two side effects:

1. Event listener
2. API request

Cleanup reverses both:

Event listener → removeEventListener
API request    → abort()

⸻

22. What Happens If We Don’t Clean Up?

Potential problems include:

❌ Duplicate event listeners
❌ Multiple subscriptions
❌ Multiple WebSocket connections
❌ Timers continuing to run
❌ Observers continuing to observe
❌ Unnecessary network requests
❌ Resource consumption
❌ Stale callbacks
❌ Unexpected behavior
❌ Potential memory/resource leaks

⸻

23. Interview Questions

Q1. What is a cleanup function?

A function returned from useEffect that reverses or releases the side effect created by the effect.

⸻

Q2. When does cleanup execute?

Before the effect runs again when dependencies change, and when the component unmounts.

⸻

Q3. Does cleanup run before the first effect?

No. There is no previous effect to clean up.

⸻

Q4. Why do we need cleanup?

To prevent unwanted side effects, duplicate subscriptions, unnecessary resource consumption, and stale external connections.

⸻

Q5. Does every useEffect require cleanup?

No. Only effects that create resources or external side effects that need to be released or reversed.

⸻

Q6. How do you clean up an event listener?

useEffect(() => {
  const handler = () => {};
  window.addEventListener("resize", handler);
  return () => {
    window.removeEventListener("resize", handler);
  };
}, []);

⸻

Q7. How do you clean up a timer?

useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => {
    clearInterval(timer);
  };
}, []);

⸻

Q8. How do you cancel a fetch request?

Use AbortController.

useEffect(() => {
  const controller = new AbortController();
  fetch("/api/data", {
    signal: controller.signal
  });
  return () => {
    controller.abort();
  };
}, []);

⸻

Q9. What happens when a dependency changes?

Old Cleanup
    ↓
New Effect

⸻

Q10. What happens in Strict Mode?

In development, React can intentionally perform:

Setup
 ↓
Cleanup
 ↓
Setup

to help identify unsafe side effects.

⸻

⭐ Final Interview Cheat Code

Memorize this:

                 useEffect
                    │
                    ↓
                  SETUP
                    │
          ┌─────────┴──────────┐
          │                    │
 Dependency changes          Unmount
          │                    │
          ↓                    ↓
       CLEANUP              CLEANUP
          │
          ↓
      New SETUP

The most important sentence

Effect = Setup. Cleanup = Undo.

addEventListener   → removeEventListener
setInterval        → clearInterval
setTimeout         → clearTimeout
subscribe          → unsubscribe
WebSocket          → close
observe            → disconnect
fetch              → abort
connect            → disconnect

Senior React Interview Answer

“I use useEffect cleanup to manage the lifecycle of external side effects. The cleanup runs before the effect re-executes when its dependencies change and when the component unmounts. I use it for event listeners, timers, subscriptions, WebSockets, observers, and cancellable network requests. The key principle is that every resource created during setup should be properly released during cleanup.”