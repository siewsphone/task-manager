import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import Header from "./components/Header";
import TaskListPage from "./components/TaskListPage";
import TaskDetailPage from "./components/TaskDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Routes>
      </TaskProvider>
    </BrowserRouter>
  );
}
