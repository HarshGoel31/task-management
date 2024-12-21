import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
      localStorage.setItem(
        "tasks_" + localStorage.getItem("currentUser"),
        JSON.stringify(state.tasks)
      );
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((_, index) => index !== action.payload);
      localStorage.setItem(
        "tasks_" + localStorage.getItem("currentUser"),
        JSON.stringify(state.tasks)
      );
    },
    editTask(state, action) {
      state.tasks[action.payload.index] = action.payload.updatedTask;
      localStorage.setItem(
        "tasks_" + localStorage.getItem("currentUser"),
        JSON.stringify(state.tasks)
      );
    },
    toggleTaskCompletion(state, action) {
      state.tasks[action.payload].completed =
        !state.tasks[action.payload].completed;
      localStorage.setItem(
        "tasks_" + localStorage.getItem("currentUser"),
        JSON.stringify(state.tasks)
      );
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, deleteTask, editTask, toggleTaskCompletion, setTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
