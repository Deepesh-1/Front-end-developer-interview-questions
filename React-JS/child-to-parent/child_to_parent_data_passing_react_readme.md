# Passing Data from Child to Parent in React

## Interview Answer

> To pass data from a child component to a parent component in React, we use a **callback function**.
>
> React follows **unidirectional data flow**, meaning data normally flows from **parent → child**. Therefore, the parent passes a function down to the child as a prop. The child calls that function and passes the required data as an argument. The parent receives the data and can update its state.

---

## Mental Model

```text
                 Parent Component
                       │
                       │ 1. Pass callback as prop
                       │    handleClick={handleClick}
                       ▼
                 Child Component
                       │
                       │ 2. Child calls callback
                       │    handleClick("Hello")
                       ▼
                 Parent Callback
                       │
                       │ 3. Receive data
                       │
                       ▼
                 setMessage(data)
                       │
                       ▼
                 Parent re-renders
```

### The important point

The child is **not directly updating the parent's state**.

Instead:

```text
Parent owns state
      ↓
Parent creates callback
      ↓
Callback passed to Child
      ↓
Child invokes callback
      ↓
Data travels as function argument
      ↓
Parent updates its state
```

---

## Steps to Follow

### Parent Component

1. Create a state variable to hold the data coming from the child.
2. Create a callback function that receives the data.
3. Pass the callback function to the child as a prop.

### Child Component

1. Accept the callback function through props.
2. Call the callback inside an event handler.
3. Pass the required data as an argument.

---

# Code Example

## Parent.jsx

```jsx
import React, { useState } from 'react';
import Child from './Child';

export default function Parent() {
  // 1. State to hold data received from the child
  const [message, setMessage] = useState('');

  // 2. Callback function to receive data from the child
  const handleClick = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  return (
    <div>
      <h2>Message from Child: {message}</h2>

      {/* 3. Pass callback to child as a prop */}
      <Child handleClick={handleClick} />
    </div>
  );
}
```

---

## Child.jsx

```jsx
import React from 'react';

export default function Child({ handleClick }) {
  // 1. Call the callback and pass data to the parent
  const clickHandler = () => {
    handleClick('Hello');
  };

  return (
    <div>
      <button onClick={clickHandler}>
        Click Me
      </button>
    </div>
  );
}
```

---

# Data Flow

When the user clicks the button:

```text
1. User clicks button
          ↓
2. Child's clickHandler runs
          ↓
3. handleClick("Hello")
          ↓
4. Parent's handleClick receives "Hello"
          ↓
5. setMessage("Hello")
          ↓
6. Parent re-renders
          ↓
7. UI displays "Hello"
```

---

# Visual Diagram

![Passing data from child to parent](./a_clean_infographic_tutorial_page_like_a_readme.m.png)

---

# Why is this called "Child to Parent" data passing?

Technically, React's data flow is still **parent → child**.

The parent owns the state and sends a function downward:

```text
Parent
   │
   │ callback function
   ▼
Child
```

The child then invokes that function:

```text
Child
   │
   │ function argument
   ▼
Parent's callback
```

So the **function travels downward**, while the **data travels upward through the function call**.

This is an important interview distinction.

---

# Example with Input

A common real-world example is a child form sending entered data to its parent.

### Parent

```jsx
function Parent() {
  const [name, setName] = useState('');

  const handleNameChange = (nameFromChild) => {
    setName(nameFromChild);
  };

  return (
    <>
      <h2>Hello {name}</h2>

      <Child onNameChange={handleNameChange} />
    </>
  );
}
```

### Child

```jsx
function Child({ onNameChange }) {
  return (
    <input
      onChange={(event) => {
        onNameChange(event.target.value);
      }}
    />
  );
}
```

Flow:

```text
User types "Deepesh"
        ↓
Child input onChange
        ↓
onNameChange("Deepesh")
        ↓
Parent callback
        ↓
setName("Deepesh")
        ↓
Parent re-renders
        ↓
Hello Deepesh
```

---

# Important Interview Questions

## 1. Can a child directly modify the parent's state?

**No.**

The child should not directly access the parent's state setter unless the parent explicitly passes that setter down.

Normally, the parent exposes the required behavior through a callback.

```jsx
<Child onSubmit={handleSubmit} />
```

The child then calls:

```jsx
onSubmit(data);
```

---

## 2. Why do we use a callback?

Because React follows **unidirectional data flow**.

The parent owns the state, so the parent provides a controlled way for the child to communicate an event or data back.

```text
State ownership → Parent
Communication API → Callback prop
Data → Function argument
```

---

## 3. Is this actually two-way data binding?

No.

React does **not** automatically provide two-way data binding.

It is better described as:

```text
Parent owns state
       ↓
Parent → Child
       ↓
Child triggers callback
       ↓
Callback → Parent
       ↓
Parent updates state
```

This is still explicit, controlled data flow.

---

## 4. Can we pass the state setter directly?

Yes.

For example:

```jsx
function Parent() {
  const [message, setMessage] = useState('');

  return (
    <Child setMessage={setMessage} />
  );
}
```

Child:

```jsx
function Child({ setMessage }) {
  return (
    <button onClick={() => setMessage('Hello')}>
      Click
    </button>
  );
}
```

However, in larger applications, a semantic callback is often cleaner:

```jsx
<Child onMessageChange={handleMessageChange} />
```

rather than exposing the implementation detail:

```jsx
<Child setMessage={setMessage} />
```

---

# 5. What if two sibling components need to share data?

Lift the state up to their **common parent**.

```text
             Parent
            /      \
           /        \
      Child A      Child B
```

Instead of:

```text
Child A → Child B
```

use:

```text
Child A
   │
   ▼
Parent state
   │
   ▼
Child B
```

This is called **lifting state up**.

---

# 6. What if components are deeply nested?

Passing callbacks through many levels can result in **prop drilling**.

For example:

```text
Parent
  ↓
Child
  ↓
Grandchild
  ↓
GreatGrandchild
```

If the callback has to pass through many components that don't actually use it, consider:

- React Context
- Redux / Redux Toolkit
- Zustand
- another appropriate state-management solution

---

# Common Mistakes

### ❌ Calling the callback during render

```jsx
<Child handleClick={handleClick('Hello')} />
```

This executes immediately during rendering.

### ✅ Pass a function

```jsx
<Child handleClick={() => handleClick('Hello')} />
```

Or let the child decide when to call it:

```jsx
<Child handleClick={handleClick} />
```

---

### ❌ Trying to mutate parent state directly

```jsx
// Don't try to directly modify parent's state
parentState.message = 'Hello';
```

React state should be updated through the state-management mechanism that owns it.

---

# Interview Cheat Code

Remember:

```text
PARENT OWNS STATE
       ↓
PARENT CREATES CALLBACK
       ↓
CALLBACK PASSED TO CHILD
       ↓
CHILD INVOKES CALLBACK
       ↓
DATA PASSED AS ARGUMENT
       ↓
PARENT UPDATES STATE
       ↓
PARENT RE-RENDERS
```

### 30-second interview answer

> "React follows unidirectional data flow, so data normally flows from parent to child through props. If a child needs to send data back to its parent, the parent creates a callback function and passes it to the child as a prop. The child invokes that callback and passes the required data as an argument. The parent receives that data, usually updates its state, and React re-renders the UI. For sibling components, I would typically lift the shared state to their common parent."

---

# Senior-Level Follow-ups

Be prepared for these questions:

1. Why doesn't React support direct child-to-parent props?
2. Is child-to-parent communication really opposite data flow?
3. When should you lift state up?
4. When does callback passing become prop drilling?
5. When would you use Context instead?
6. When would you use Redux/Zustand instead?
7. Should you pass `setState` directly to a child?
8. How can callback props cause unnecessary re-renders?
9. When would `useCallback` help?
10. How would you pass data between unrelated components?
11. How would you handle this communication across micro-frontends?
12. What changes if the child is a Server Component in Next.js?

---

## One-Line Memory Trick

> **"Parent owns the state, parent passes the function, child calls the function, data comes back as the argument."**
