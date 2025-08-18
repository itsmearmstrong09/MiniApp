import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch first 10 tasks
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`${API_URL}?_limit=10`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  // Add a new task
  async function addTask(title) {
    const newTask = {
      title,
      completed: false,
      userId: 1,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const createdTask = await res.json();

      // Add to state (prepend so it shows first)
      setTasks((prev) => [{ ...createdTask, id: Date.now() }, ...prev]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  }

  // Toggle complete/incomplete
  async function toggleTask(id) {
    // Optimistic update (update UI first)
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, completed: !target.completed }),
      });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </div>
  );
}
