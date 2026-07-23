import { useParams, Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { useContext, useState } from "react";

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export default function TaskDetailPage() {
  const { id } = useParams();
  const { tasks, updateTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const task = tasks.find((t) => t.id === Number(id));

  const beginEdit = () => {
    if (!task) return;
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!task || !trimmedTitle) return;

    updateTask(task.id, {
      title: trimmedTitle,
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
    });

    setIsEditing(false);
  };

  if (!task) {
    return (
      <div className="detail-page">
        <div className="not-found">
          <div className="not-found-icon">🔍</div>
          <h2>Task not found</h2>
          <p>The task with ID <strong>#{id}</strong> does not exist or was deleted.</p>
          <Link to="/tasks" className="btn-back">← Back to tasks</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/tasks" className="btn-back">← Back to tasks</Link>
      <div className="detail-card">
        {isEditing ? (
          <form className="detail-edit-form" onSubmit={handleSubmit}>
            <h2>Edit Task</h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description (optional)"
              rows={3}
            />

            <div className="form-row">
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

            <div className="detail-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-add" disabled={!form.title.trim()}>
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            <h2>{task.title}</h2>
            <div className="detail-badges">
              <span className={`status-badge status-${task.status}`}>
                {statusLabels[task.status]}
              </span>
              <span className={`priority-badge priority-${task.priority}`}>
                {task.priority}
              </span>
            </div>
            <p className="detail-description">{task.description || "No description provided."}</p>
            <div className="detail-meta">
              <div className="detail-meta-item">
                <span className="detail-meta-label">Task ID</span>
                <span className="detail-meta-value">#{task.id}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Status</span>
                <span className={`status-badge status-${task.status}`}>
                  {statusLabels[task.status]}
                </span>
              </div>
            </div>
            <div className="detail-actions">
              <button type="button" className="btn-add" onClick={beginEdit}>
                Edit Task
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
