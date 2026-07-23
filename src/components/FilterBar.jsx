import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const PRIORITY_FILTERS = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export default function FilterBar() {
  const { statusFilter, priorityFilter, setStatusFilter, setPriorityFilter } =
    useContext(TaskContext);

  return (
    <div className="filter-stack">
      <div className="filter-group">
        <p className="filter-group-label">Status</p>
        <div className="filter-bar">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${statusFilter === f.value ? "active" : ""}`}
              onClick={() => setStatusFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-group-label">Priority</p>
        <div className="filter-bar">
          {PRIORITY_FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter-btn ${priorityFilter === f.value ? "active" : ""}`}
              onClick={() => setPriorityFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
