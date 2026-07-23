import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { useContext, useState } from "react";

const priorityColors = {
  high: "priority-high",
  medium: "priority-medium",
  low: "priority-low",
};

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export default function TaskList() {
  const { tasks, filteredTasks, deleteTask, reorderTasks } = useContext(TaskContext);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dropTargetId, setDropTargetId] = useState(null);

  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(taskId));
  };

  const handleDragOver = (e, taskId) => {
    e.preventDefault();
    if (taskId !== dropTargetId) {
      setDropTargetId(taskId);
    }
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();

    const transferId = Number(e.dataTransfer.getData("text/plain"));
    const sourceId = Number.isFinite(transferId) && transferId > 0 ? transferId : draggedTaskId;

    if (sourceId && sourceId !== targetId) {
      reorderTasks(sourceId, targetId);
    }

    setDraggedTaskId(null);
    setDropTargetId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDropTargetId(null);
  };

  return (
    <div className="task-list">
      <p className="task-count">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>
      <p className="task-count">Drag and drop tasks to reorder.</p>

      {filteredTasks.length === 0 ? (
        <p className="empty-state">No tasks match the current filter.</p>
      ) : (
        <div className="task-rows">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task-row${draggedTaskId === task.id ? " is-dragging" : ""}${
                dropTargetId === task.id && draggedTaskId !== task.id ? " is-drop-target" : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={(e) => handleDragOver(e, task.id)}
              onDrop={(e) => handleDrop(e, task.id)}
              onDragEnd={handleDragEnd}
            >
              <Link to={`/tasks/${task.id}`} className="task-link">
                <span className="task-title">{task.title}</span>
              </Link>
              <div className="task-meta">
                <span className={`status-badge status-${task.status}`}>
                  {statusLabels[task.status]}
                </span>
                <span className={`priority-badge ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
                <button
                  className="btn-delete"
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
