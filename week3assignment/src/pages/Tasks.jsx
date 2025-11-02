import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <Card title="Task Manager">
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-full text-black"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button variant="primary" onClick={() => setFilter("all")}>All</Button>
        <Button variant="secondary" onClick={() => setFilter("active")}>Active</Button>
        <Button variant="danger" onClick={() => setFilter("completed")}>Completed</Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center">
            <span
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
