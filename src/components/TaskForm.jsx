import React, { useState } from "react";

export default function TaskForm({ onAdd }) {
  // TaskForm component to add a new task by passing onAdd function prop
  const [title, setTitle] = useState(""); // state to hold the title of the new task

  function handleSubmit(e) {
    e.preventDefault(); // handles unnecessary page refresh
    if (!title.trim()) return; // ignore empty input
    onAdd(title); // call onAdd function prop with the new task title passed
    setTitle(""); // clear input
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={title}
        placeholder="Add a new task..."
        onChange={(e) => setTitle(e.target.value)} // updates title state on input change
        style={{ padding: "8px", width: "250px" }}
      />
      <button type="submit" style={{ marginLeft: "10px", padding: "8px 12px" }}>
        Add Task
      </button>
    </form>
  );
}
