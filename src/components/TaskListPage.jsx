import FilterBar from "../components/FilterBar";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";

export default function TaskListPage() {
  return (
    <main className="container">
      <AddTaskForm />
      <FilterBar />
      <TaskList />
    </main>
  );
}
