import React from "react";

export default function TaskList({ tasks, onToggle, onDelete }) {
  // component for displaying tasks and handling toggle and delete
  // tasks as props a array of tasks
  // onToggle is a function prop to toggle task complete or incomplete
  // onDelete is a function prop to delete a task

  if (!tasks.length) return <p>No tasks found.</p>; // if tasks array is empty

  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "8px" }}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)} // toggles the task status
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none", // if task is completed, strike through the text
                  marginLeft: "8px",
                }}
              >
                {task.title}
              </span>
            </label>
            <button
              onClick={() => onDelete(task.id)} // calls onDelete function prop with the task id to delete the task
              style={{
                marginLeft: "10px",
                color: "white",
                background: "red",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
