const initialTasks = [
  { id: 1, title: "Set up project repository",    description: "Initialise a Git repo, add a .gitignore, and push the first commit.",                         status: "done",        priority: "high"   },
  { id: 2, title: "Design database schema",       description: "Draft the ERD for the contacts and deals tables.",                                            status: "done",        priority: "high"   },
  { id: 3, title: "Build login page",             description: "Create a login form with email and password fields and basic validation.",                     status: "in-progress", priority: "high"   },
  { id: 4, title: "Write unit tests for reducer", description: "Cover ADD_TASK, DELETE_TASK, and SET_FILTER with at least two cases each.",                     status: "todo",        priority: "medium" },
  { id: 5, title: "Update README",                description: "Add setup instructions, a screenshot, and a description of the tech stack.",                   status: "todo",        priority: "low"    },
  { id: 6, title: "Deploy to Vercel",             description: "Connect the GitHub repo to Vercel and configure environment variables.",                        status: "todo",        priority: "medium" },
];

export const initialState = {
  tasks: initialTasks,
  filter: "all",
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      // Derive ID from current tasks so it stays unique after reloads.
      {
        const nextId =
          state.tasks.reduce((maxId, task) => Math.max(maxId, Number(task.id) || 0), 0) + 1;

        return {
          ...state,
          tasks: [...state.tasks, { ...action.payload, id: nextId }],
        };
      }

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                ...action.payload.updates,
                id: task.id,
              }
            : task
        ),
      };

    case "REORDER_TASKS": {
      const { draggedId, targetId } = action.payload;

      if (draggedId === targetId) {
        return state;
      }

      const fromIndex = state.tasks.findIndex((task) => task.id === draggedId);
      const toIndex = state.tasks.findIndex((task) => task.id === targetId);

      if (fromIndex === -1 || toIndex === -1) {
        return state;
      }

      const reordered = [...state.tasks];
      const [movedTask] = reordered.splice(fromIndex, 1);
      const insertIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;

      reordered.splice(insertIndex, 0, movedTask);

      return {
        ...state,
        tasks: reordered,
      };
    }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}
