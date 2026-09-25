import React, { useState, useEffect } from 'react';

/**
 * Debounce demonstrates the classic "debounced search" pattern:
 * wait until the user stops typing for a short delay before firing
 * the API request, so we don't spam the server on every keystroke.
 */
function App() {
  // The current value in the search box (also used as the API query param)
  const [userId, setUserId] = useState('');
  // The list of posts returned by the API for the current userId
  const [posts, setPosts] = useState([]);

  // This effect re-runs every time `userId` changes (i.e. on every keystroke)
  useEffect(() => {
    // If the input is empty, clear the results and skip the fetch entirely
    if (!userId) {
      setPosts([]);
      return;
    }

    // Set a 500ms timer; if the user types another character before it fires,
    // the cleanup function below cancels it so only the latest value is sent
    const timer = setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }, 500);

    // Cleanup: cancel the previous timer whenever userId changes again.
    // This is what makes the debounce work — only the final keystroke's
    // timer survives long enough to actually trigger the fetch.
    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <div style={{ padding: 20 }}>
      {/* Text input bound to userId; every keystroke updates state */}
      <input
        type="text"
        placeholder="Enter string"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      {/* Render the matching posts as a simple list */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
