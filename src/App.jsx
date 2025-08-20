import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskFilter from "./components/TaskFilter.jsx";
import TaskStats from "./components/TaskStats.jsx";

const API_URL = "https://jsonplaceholder.typicode.com/todos"; // storing the API URL

export default function App() {
  const [tasks, setTasks] = useState([]); // array of task list, initially empty array
  const [loading, setLoading] = useState(true); //to show loading statein while fetching tasks, initially set to true indicating loading
  const [saving, setSaving] = useState(false); // to show 'saving' when a new task is added, initially set to false indicating not saving
  const [filter, setFilter] = useState("all"); //to display all | completed | incomplete tasks, initially set to "all"

  // Fetch first 10 tasks
  useEffect(() => {
    // to control the fetching of tasks
    async function fetchTasks() {
      //function to fetch tasks
      try {
        const res = await fetch(`${API_URL}?_limit=15`); //fetches first 10 tasks from the API
        const data = await res.json();
        setTasks(data); //stores the tasks in the state
      } catch (err) {
        console.error("Error fetching tasks:", err); // displays error if fetching fails
      } finally {
        setLoading(false); //loading state set to false
      }
    }
    fetchTasks(); // calls the fetchTasks function
    return () => {
      console.log("Cleanup on unmount"); // cleanup function to run on component unmount
    };
  }, []); // empty dependency array means this effect runs once on mount

  // Add a new task
  async function addTask(title) {
    //function to add a new task with title getting passed
    const newTask = { title, completed: false, userId: 1 }; // new task object to be added

    setSaving(true); //sets saving to true to show "Saving..." when task is added

    try {
      const res = await fetch(API_URL, {
        method: "POST", // POST request to add a new task
        headers: { "Content-Type": "application/json" }, // JSON format
        body: JSON.stringify(newTask), //js object to JSON string
      });
      const createdTask = await res.json(); // reads the response body that is the new added todo and parses it as JSON.

      setTasks((prev) => [{ ...createdTask, id: Date.now() }, ...prev]); // setTasks is set with createdTask that spreads the new todo,
      //  prev spreads the previous tasks, using Date.now() to get a unique id
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setTimeout(() => setSaving(false), 2000); // set saving state to false to hide "Saving" after 2 seconds
    }
  }

  // Toggle complete/incomplete
  async function toggleTask(id) {
    // function to mark a task complete or incomplete with the id passed

    setTasks(
      (
        prev // updating the state by the prev task that is the last/lattest updated tasks
      ) =>
        prev.map(
          (
            task // map to go through the tasks
          ) => (task.id === id ? { ...task, completed: !task.completed } : task) // check the task clicked on by matching id
          // spreading the updated task and setting it as completed or else keeps it as task with no change
        )
    );

    const target = tasks.find((t) => t.id === id); // finding the whole task object and storing them in target since passing id is not enough
    if (!target) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT", // PUT request to update the task
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...target, completed: !target.completed }), // spreading the target task and updating the completed status
      });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  }

  // Delete task
  async function deleteTask(id) {
    // function to delete task that takes in id of the task getting deleted
    const prevTasks = tasks; // copy of the current state before modifying it.
    setTasks((prev) => prev.filter((task) => task.id !== id)); // creates a new array excluding the task that matches id to be deleted

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" }); // DELETE request to remove the task
    } catch (err) {
      console.error("Error deleting task:", err);
      setTasks(prevTasks);
    }
  }

  // Apply filter
  const filteredTasks = tasks.filter((task) => {
    // using filter on tasks(list of tasks) to check the status of the tasks wether
    if (filter === "completed") return task.completed; // they are completed and returns only completed tasks or
    if (filter === "incomplete") return !task.completed; // not completed and returns incomplete tasks
    return true; // all
  });

  if (loading) return <p>Loading tasks...</p>; // show loading state while fetching tasks

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      {/* passing addTask function to TaskForm component, deals with adding a new task */}
      {saving && <p style={{ color: "blue" }}>Saving...</p>}{" "}
      {/* show saving state while saving a new task */}
      <TaskFilter filter={filter} setFilter={setFilter} />
      {/* passing filter and setFilter to TaskFilter component, deals with filtering tasks as all, complete, or incomplete */}
      <TaskStats tasks={tasks} />
      {/* passing tasks to TaskStats component, deals with showing task statistics, that is how many are completed, incomplete, or all */}
      {} <p>Succes</p>
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
      {/* list of tasks by filteredTasks that is an already list of processed tasks
      , toggleTask to mark complete/incomplete, 
      and deleteTask functions deals with deleting tasks */}
    </div>
  );
}
