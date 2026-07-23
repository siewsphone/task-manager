import { useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

export default function AddTaskForm() {
  const { addTask } = useContext(TaskContext);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const isInvalid = !form.title.trim();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalid) return;
    addTask({
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
    });
    setForm({ title: "", description: "", status: "todo", priority: "medium" });
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h3>Add New Task</h3>
      <div className="form-row">
        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
        rows={2}
      />
      <button type="submit" className="btn-add" disabled={isInvalid}>
        Add Task
      </button>
    </form>
  );
}
