What are we trying to achieve?

We want to prevent a function from executing too frequently.

In this example:

const throttleTime = 1000;

means the function can execute at most once every 1 second.

If the user clicks repeatedly:

Click 1    → Execute ✅
Click 2    → Ignore ❌
Click 3    → Ignore ❌
Click 4    → Ignore ❌
...
1 second later
Click      → Execute ✅

This is called throttling.

Step 1: Import useState and useRef

import { useState, useRef } from "react";

We use two React Hooks.

useState

useState is used for data that affects the UI.

const [count, setCount] = useState(0);

Here:

count = current count

setCount = function used to update the count

0 = initial value

Whenever setCount() is called, React re-renders the component.

useRef

const lastRun = useRef(0);

useRef gives us an object like:

{
  current: 0
}

So we access the value using:

lastRun.current

The important difference is:

useState
   ↓
Value changes
   ↓
React re-renders


useRef
   ↓
Value changes
   ↓
React does NOT re-render

We use useRef here because we only need to remember the previous execution time. We don't need the UI to update when that timestamp changes.

Step 2: Store the last execution time

const lastRun = useRef(0);

Initially:

lastRun.current = 0

After the first successful execution:

lastRun.current = now;

For example:

lastRun.current = 1758780000000

The exact number isn't important. It is simply the timestamp of the last execution.

Step 3: Handle the click

const handleClick = () => {

This function runs whenever the user clicks:

<button onClick={handleClick}>

So the flow is:

User clicks button
       ↓
handleClick()
       ↓
Get current time
       ↓
Check throttle
       ↓
Execute or ignore

Step 4: Get the current time

const now = Date.now();

Date.now() returns the current time in milliseconds.

For example:

now = 1758780000000

Every time the user clicks, we get a new timestamp.

Step 5: Define the throttle interval

const throttleTime = 1000;

1000 milliseconds equals:

1000 ms = 1 second

So we're saying:

The function should execute at most once every 1 second.

If you wanted 10 seconds:

const throttleTime = 10000;

Step 6: The important throttle condition

if (now - lastRun.current >= throttleTime) {

This is the heart of the throttle.

We're calculating:

current time - previous execution time

For example:

Current time       = 5000
Last execution     = 3000

5000 - 3000 = 2000 ms

Since:

2000 >= 1000

the function is allowed to execute.

What if the user clicks too quickly?

Suppose:

Last execution = 3000
Current time   = 3500

Then:

3500 - 3000 = 500 ms

But our throttle interval is:

1000 ms

Therefore:

500 >= 1000

is:

false

So nothing happens.

The click is ignored.

Step 7: Remember when we executed

Once the condition is true:

lastRun.current = now;

We store the current timestamp.

For example:

Before:

lastRun.current = 3000
now              = 5000


After:

lastRun.current = 5000

This becomes the reference point for the next click.

Step 8: Execute the actual operation

setCount((prevCount) => prevCount + 1);

We're increasing the count by one.

Using the functional form:

setCount((prevCount) => prevCount + 1);

means:

Take the previous state value and increase it by 1.

For example:

count = 0
       ↓
click
       ↓
count = 1
       ↓
click after 1 second
       ↓
count = 2

Complete execution flow

Suppose the user clicks rapidly.

                 User clicks
                      ↓
                 handleClick()
                      ↓
                 Date.now()
                      ↓
        How long since last execution?
                      ↓
              ┌───────┴───────┐
              ↓               ↓
          < 1000ms         >= 1000ms
              ↓               ↓
           Ignore          Execute
                              ↓
                     lastRun.current = now
                              ↓
                     setCount(prev + 1)

Why use useRef instead of useState?

You might ask:

Why not use useState for lastRun?

For example:

const [lastRun, setLastRun] = useState(0);

You technically could, but it is unnecessary here.

We don't need the UI to display:

Last execution: 1758780000000

We only need to remember the value internally.

Therefore:

const lastRun = useRef(0);

is a better fit.

Remember

useState
→ value affects UI
→ changing it causes re-render


useRef
→ value needs to persist
→ changing it does NOT cause re-render

Why does lastRun need to persist?

This is very important.

We need the previous execution time when the next click happens.

In plain JavaScript:

let lastRun = 0;

function handleClick() {
  const now = Date.now();

  if (now - lastRun >= 1000) {
    lastRun = now;

    console.log("Executed");
  }
}

The variable exists outside the function, so it persists between calls.

In React, the equivalent idea is:

const lastRun = useRef(0);

and:

lastRun.current = now;

The value persists between React renders.

Interview definition

Throttling limits how frequently a function can execute within a specified time interval.

For example:

const throttleTime = 1000;

means:

The function can execute at most once every 1000 milliseconds.

Common use cases include:

Scroll events

Mouse movement

Window resize

Button clicks

API calls triggered by frequent events

Infinite scrolling

One-line mental model

Remember this:

Event happens
     ↓
Has enough time passed?
     ↓
   YES → Execute + remember current time
   NO  → Ignore

The core JavaScript logic is simply:

let lastRun = 0;

function throttleFunction() {
  const now = Date.now();

  if (now - lastRun >= 1000) {
    lastRun = now;

    // Execute function
  }
}

React adds useRef so that the lastRun value persists across renders without triggering another render.
