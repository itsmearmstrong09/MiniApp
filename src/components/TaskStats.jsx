import React from "react";

export default function TaskStats({ tasks }) {
  // function that takes list of tasks as props
  const { total, completed, pending } = tasks.reduce(
    // using reduce to find total, completed, and pending tasks
    (acc, task) => {
      acc.total++; // counts every task and increments the total
      if (task.completed) {
        acc.completed++; // counts completed tasks and increments the completed count
      } else {
        acc.pending++; // counts pending tasks and increments the pending count
      }
      return acc; // returns the accumulator object
    },
    { total: 0, completed: 0, pending: 0 }

    // initial accumulator values in object form
  );

  return total === completed ? (
    <p>Success</p>
  ) : (
    <div style={{ margin: "10px 0", padding: "8px" }}>
      <p style={{ display: "flex", gap: "2rem" }}>
        <span>Total Tasks: {total}</span>
        <span>Completed: {completed}</span>
        <span>Pending: {pending}</span>
      </p>
    </div>
  );
}
