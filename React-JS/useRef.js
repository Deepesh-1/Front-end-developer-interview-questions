import React, { useRef } from 'react';

/**
 * Useref demonstrates the useRef hook, which gives you a mutable container
 * that persists across renders without triggering re-renders when it changes.
 *
 * Common use cases:
 * - Accessing a DOM element directly (e.g. to focus an input)
 * - Storing a mutable value that doesn't need to trigger re-renders
 */
export default function Useref() {
  // Create a ref that we'll attach to the input element below.
  // `.current` starts as null and React fills it with the actual DOM node.
  const inputRef = useRef(null);

  // When the button is clicked, focus the input by calling the DOM
  // focus() method through the ref — no state needed, no re-render.
  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Attach the ref to this input so we can access it imperatively */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Type something..."
        style={{ padding: '8px', fontSize: '16px' }}
      />
      {/* Clicking this button focuses the input above via the ref */}
      <button onClick={handleFocus} style={{ marginLeft: 10, padding: '8px' }}>
        Focus the input
      </button>
    </div>
  );
}
