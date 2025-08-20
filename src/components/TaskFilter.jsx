import React from "react";

export default function TaskFilter({ filter, setFilter }) {
  // TaskFilter component for filtering tasks taking the filter and setFilter as props
  return (
    <div style={{ margin: "10px 0" }}>
      <button
        onClick={() => setFilter("all")} // when all button is clicked the filter state is set to "all"
        style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
      >
        All
      </button>
      <button
        onClick={() => setFilter("completed")} // when completed button is clicked the filter state is set to "completed"
        style={{
          fontWeight: filter === "completed" ? "bold" : "normal", // checks if the current filter is "completed" to update UI
          marginLeft: "8px",
        }}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter("incomplete")} // when incomplete button is clicked the filter state is set to "incomplete"
        style={{
          fontWeight: filter === "incomplete" ? "bold" : "normal", // checks if the current filter is "incomplete" to update UI
          marginLeft: "8px",
        }}
      >
        Incomplete
      </button>
    </div>
  );
}
