import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";
const FILTERS = [
  { value: "all", label: "All" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function FilterBar() {
  const { filter, setFilter } = useContext(TaskContext);

  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`filter-btn ${filter === f.value ? "active" : ""}`}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
