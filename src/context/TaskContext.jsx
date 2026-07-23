import { createContext, useEffect, useReducer } from "react";
import { taskReducer, initialState } from "../reducer/taskReducer";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();

const TASKS_STORAGE_KEY = "taskManager.tasks";

function initState() {
  try {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!storedTasks) {
      return initialState;
    }

    const parsedTasks = JSON.parse(storedTasks);
    if (!Array.isArray(parsedTasks)) {
      return initialState;
    }

    return {
      ...initialState,
      tasks: parsedTasks,
    };
  } catch {
    return initialState;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState, initState);

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(state.tasks));
  }, [state.tasks]);

  const filteredTasks = state.tasks.filter((task) =>
    (state.statusFilter === "all" ? true : task.status === state.statusFilter) &&
    (state.priorityFilter === "all" ? true : task.priority === state.priorityFilter)
  );

  const addTask = (task) => dispatch({ type: "ADD_TASK", payload: task });
  const updateTask = (id, updates) =>
    dispatch({ type: "UPDATE_TASK", payload: { id, updates } });
  const reorderTasks = (draggedId, targetId) =>
    dispatch({ type: "REORDER_TASKS", payload: { draggedId, targetId } });
  const deleteTask = (id) => dispatch({ type: "DELETE_TASK", payload: id });
  const setStatusFilter = (statusFilter) =>
    dispatch({ type: "SET_STATUS_FILTER", payload: statusFilter });
  const setPriorityFilter = (priorityFilter) =>
    dispatch({ type: "SET_PRIORITY_FILTER", payload: priorityFilter });

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        statusFilter: state.statusFilter,
        priorityFilter: state.priorityFilter,
        filteredTasks,
        addTask,
        updateTask,
        reorderTasks,
        deleteTask,
        setStatusFilter,
        setPriorityFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

