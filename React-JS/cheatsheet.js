// Search
const filteredData = data.filter((item)=>(item.name.toLowerCase().includes(query.toLowerCase())))
 
// Sorting 
 
  // Ascending
 [...users].sort((a,b)=> a.name.localeCompare(b.name))
 
  // Descending
 [...users].sort((a,b)=> b.name.localeCompare(a.name))


  // Sorting toggle
const [sortType, setSortType] = useState("ascending")
  const toggleSort = () => {
    const toggleSortType = [...users].sort((a, b) =>
      sortType === 'ascending'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    );
    setUsers(toggleSortType);
    setSortType((prev) => (prev === 'ascending' ? 'descending' : 'ascending'));
  };



  // Create a "todos" state variable holding an array of todo items.
  // Each item has a unique id, a text description, and a completed flag.
  // Initialize it with two sample todos.
  const [todos, setTodos] = useState([
    {
      id: crypto.randomUUID(),       // Generate a random unique ID for this todo
      text: 'Learn React',            // The text content of the todo
      completed: false,               // Whether this todo is checked off (starts unchecked)
    }
  ]);

  // "value" holds the current text typed into the "Add item" input box
  const [value, setValue] = useState('');

  // "editId" stores the id of the todo currently being edited (null when not editing)
  const [editId, setEditId] = useState(null);

  // "editText" stores the current text in the edit input box while editing
  const [editText, setEditText] = useState('');

  // Called when the "Add item" button is clicked — adds a new todo to the list
  function addItem() {
    // If the input is empty (or only spaces), do nothing
    if (!value.trim()) return;

    // Create a new todo object with a unique id and the typed text
    const newValue = {
      id: crypto.randomUUID(),       // Generate a random unique ID
      text: value,                    // Use the text typed into the input box
      completed: false,               // New items always start as not completed
    };

    // Add the new todo to the end of the existing list
    setTodos((prev) => [...prev, newValue]);

    // Clear the input box so the user can type the next item
    setValue('');
  }

  // Called when a checkbox is toggled — flips the completed status of a todo
  function toggleFunction(id) {
    // Map over all todos; for the one whose id matches, flip its "completed" value
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id               // Is this the todo that was toggled?
          ? {
            ...item,                  // Keep all existing properties
            completed: !item.completed, // Flip the completed flag
          }
          : item                       // Leave all other todos unchanged
      )
    );
  }

  // Called when the "delete" button is clicked — removes a todo from the list
  function deleteTodo(id) {
    // Filter out (remove) the todo whose id matches
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  // Called when the "Edit" button is clicked — switches a todo into editing mode
  function startEdit(id, text) {
    setEditId(id);        // Remember which todo is being edited
    setEditText(text);    // Pre-fill the edit input with the todo's current text
  }

  // Called when the "Save" button is clicked — saves the edited text
  function saveEdit() {
    // If the edited text is empty, do nothing
    if (!editText.trim()) return;

    // Update the todo whose id matches editId with the new text
    setTodos((prev) =>
      prev.map((item) =>
        item.id === editId            // Is this the todo being edited?
          ? { ...item, text: editText } // Replace its text with the edited value
          : item                       // Leave all other todos unchanged
      )
    );

    // Exit editing mode and clear the edit text
    setEditId(null);
    setEditText('');
  }

  // Called when the "Cancel" button is clicked — exits editing without saving
  function cancelEdit() {
    setEditId(null);      // Stop editing
    setEditText('');      // Clear the edit input
  }

  // The JSX below describes what the app looks like on screen
 
