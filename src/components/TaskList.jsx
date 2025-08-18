import React from "react";

export default function TaskList({ tasks, onToggle }) {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
