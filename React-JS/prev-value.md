React useState — Functional Updater (prev)

📌 What is the Functional Updater?

When the new state depends on the previous state, use the functional form of the state setter:

setState(prev => newValueBasedOnPrev);

Example:

setCount(prev => prev + 1);

Here:

prev
 ↓
Previous state value
 ↓
Calculate next state
 ↓
React stores new state

⸻

1. The Golden Rule

Ask yourself:

Does my new state depend on the previous state?

If YES → use prev.

If NO → direct value is usually sufficient.

                 Does new state
                 depend on old state?
                       │
                 ┌─────┴─────┐
                 │           │
                YES          NO
                 │           │
                 ↓           ↓
               prev       Direct value

⸻

2. Basic Counter Example

const [count, setCount] = useState(0);
setCount(prev => prev + 1);

React takes the previous state and calculates the next state:

prev = 0
 ↓
prev + 1
 ↓
1

Next update:

prev = 1
 ↓
prev + 1
 ↓
2

⸻

3. Why Not Always Use count + 1?

Consider:

const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};

It may look like the final value should be:

0 → 1 → 2 → 3

But all three expressions can be calculated using the same count value from the current render:

count = 0
setCount(0 + 1)
setCount(0 + 1)
setCount(0 + 1)

So the result can be:

1

⸻

4. Correct Approach — Functional Updater

const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};

React can process the updates sequentially:

Initial state
     ↓
    0
     ↓
prev = 0 → 1
     ↓
prev = 1 → 2
     ↓
prev = 2 → 3

Final result:

3

⸻

5. Functional Updater with Toggle

A very common React pattern:

const [isOpen, setIsOpen] = useState(false);
setIsOpen(prev => !prev);

Why use prev?

Because the new value depends on the current value:

false → true
true  → false

Example

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button onClick={() => setIsOpen(prev => !prev)}>
      Toggle Modal
    </button>
  );
}

⸻

6. Updating an Array

Suppose:

const [todos, setTodos] = useState([]);

Adding an item depends on the existing array.

setTodos(prev => [
  ...prev,
  newTodo
]);

Flow

Previous todos
      ↓
     prev
      ↓
[...prev, newTodo]
      ↓
New todos

⸻

7. Removing from an Array

setTodos(prev =>
  prev.filter(todo => todo.id !== id)
);

Here the new array depends on the previous array.

Therefore:

prev

is appropriate.

⸻

8. Updating an Array Item

setTodos(prev =>
  prev.map(todo =>
    todo.id === id
      ? {
          ...todo,
          completed: !todo.completed
        }
      : todo
  )
);

What is happening?

Previous todos
      ↓
     prev
      ↓
    map()
      ↓
Find matching todo
      ↓
Create updated object
      ↓
Return new array

⸻

9. Updating an Object

Suppose:

const [user, setUser] = useState({
  name: "Deepesh",
  age: 37
});

If the new age depends on the previous age:

setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));

Notice:

{
  ...prev,
  age: prev.age + 1
}

We preserve the existing properties and change only age.

⸻

10. Multiple Object Updates

setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));
setUser(prev => ({
  ...prev,
  name: "John"
}));

Each updater receives the latest state available in the update queue.

Conceptually:

Initial state
     ↓
{name: "Deepesh", age: 37}
     ↓
First updater
     ↓
{name: "Deepesh", age: 38}
     ↓
Second updater
     ↓
{name: "John", age: 38}

⸻

11. When You DON’T Need prev

If the new value doesn’t depend on the old value:

setName("Deepesh");
setLoading(true);
setSelectedId(10);
setTheme("dark");

There is no need to write:

setName(prev => "Deepesh");

That provides no benefit.

⸻

12. Direct Value vs Functional Updater

Direct value

setCount(count + 1);

Use when you simply want to set a value and the calculation does not need to be protected from queued updates.

Functional updater

setCount(prev => prev + 1);

Use when the next state is derived from the previous state.

⸻

13. Stale State Problem

Consider:

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <button onClick={increment}>
      {count}
    </button>
  );
}

The count variable belongs to the current render.

If multiple updates are queued before React renders again, repeatedly using:

count + 1

can calculate from the same captured value.

Functional updater avoids this problem:

setCount(prev => prev + 1);

Think:

Captured value
      ↓
Potentially stale
Functional updater
      ↓
Receives the appropriate previous
state for that update

⸻

14. Functional Updater and Batching

React can batch multiple state updates together.

Example:

setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);

The updater functions are applied in sequence.

prev = 0
   ↓
+1
   ↓
1
   ↓
+1
   ↓
2
   ↓
+1
   ↓
3

This makes functional updates particularly useful when several updates depend on one another.

⸻

15. Important: prev Means Previous State for That Update

Consider:

setCount(prev => prev + 1);

prev represents the state value provided to that updater.

It should not simply be thought of as:

“The value from the previous render.”

A better mental model is:

“Give me the state value that this update should calculate from.”

⸻

16. prev Is Not a Special React Keyword

You can technically call it anything:

setCount(previous => previous + 1);

or:

setCount(current => current + 1);

or:

setCount(value => value + 1);

All are valid.

prev is simply a common naming convention.

setCount(prev => prev + 1);

is easier to understand because it communicates:

“I’m using the previous state.”

⸻

17. Functional Updater with Todo App

This is a very useful real-world example.

const addTodo = (todo) => {
  setTodos(prev => [
    ...prev,
    todo
  ]);
};
const deleteTodo = (id) => {
  setTodos(prev =>
    prev.filter(todo => todo.id !== id)
  );
};
const toggleTodo = (id) => {
  setTodos(prev =>
    prev.map(todo =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed
          }
        : todo
    )
  );
};

All three operations depend on the existing array.

Therefore:

Add       → prev
Delete    → prev
Toggle    → prev

⸻

18. Common Interview Trap

Question:

“Should I always use prev when calling a state setter?”

Answer:

No.

Use it when the next state depends on the previous state.

Good:

setCount(prev => prev + 1);
setOpen(prev => !prev);
setItems(prev => [...prev, item]);

Unnecessary:

setName(prev => "Deepesh");
setLoading(prev => true);
setSelectedId(prev => 10);

Prefer:

setName("Deepesh");
setLoading(true);
setSelectedId(10);

⸻

19. Common Interview Scenarios

Scenario 1 — Counter

Question:

Increment the counter twice.

Better:

setCount(prev => prev + 1);
setCount(prev => prev + 1);

⸻

Scenario 2 — Toggle

Question:

Toggle a modal.

setIsOpen(prev => !prev);

⸻

Scenario 3 — Add item

Question:

Add a todo without losing existing todos.

setTodos(prev => [
  ...prev,
  newTodo
]);

⸻

Scenario 4 — Delete item

setTodos(prev =>
  prev.filter(todo => todo.id !== id)
);

⸻

Scenario 5 — Update item

setTodos(prev =>
  prev.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  )
);

⸻

20. Quick Decision Tree

                setState()
                    │
                    ↓
       Does new state depend
       on previous state?
              /          \
            YES           NO
             │             │
             ↓             ↓
     Functional updater   Direct value
             │             │
             ↓             ↓
 setState(prev => ...)   setState(value)

⸻

21. Interview Cheat Sheet

Situation	Use
Increment counter	prev
Decrement counter	prev
Toggle boolean	prev
Add to array	prev
Remove from array	prev
Update array item	prev
Update object using existing values	prev
Set fixed string	Direct value
Set fixed boolean	Direct value
Set fixed ID	Direct value
Set fixed object unrelated to previous state	Direct value

⸻

⭐ Interview Questions

Q1. When should you use the functional updater?

When the next state depends on the previous state.

setCount(prev => prev + 1);

⸻

Q2. Why use prev instead of the state variable?

Because React can batch updates, and multiple updates may otherwise calculate from the same captured state value. The functional updater allows each update to calculate from the appropriate previous state.

⸻

Q3. Is prev a React keyword?

No. It is just a parameter name. You could call it previous, current, or anything else.

⸻

Q4. Should every state update use prev?

No. Use the functional updater when the new state depends on the previous state.

⸻

Q5. Give an example where prev is required.

setCount(prev => prev + 1);

Or:

setTodos(prev => [...prev, newTodo]);

⸻

Q6. How do you toggle state safely?

setIsOpen(prev => !prev);

⸻

Q7. How do you update an array without mutating it?

setItems(prev =>
  prev.map(item =>
    item.id === id
      ? { ...item, active: true }
      : item
  )
);

⸻

🧠 Final Memory Trick

Remember this one sentence:

“If the next state depends on the previous state, use the functional updater.”

Previous state needed?
        │
        ├── YES → setState(prev => ...)
        │
        └── NO  → setState(value)

Most important examples to memorize

// Counter
setCount(prev => prev + 1);
// Toggle
setOpen(prev => !prev);
// Add
setItems(prev => [...prev, item]);
// Delete
setItems(prev => prev.filter(item => item.id !== id));
// Update
setItems(prev =>
  prev.map(item =>
    item.id === id
      ? { ...item, completed: true }
      : item
  )
);
// Object
setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));

⭐ Senior React Interview Answer

“I use the functional updater whenever the next state is derived from the previous state. This is important because React may batch state updates, and using the functional form ensures each update is calculated from the correct state value in the update queue. I commonly use it for counters, toggles, and immutable updates to arrays and objects.”