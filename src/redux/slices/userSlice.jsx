import { createSlice } from "@reduxjs/toolkit";
import { setTasks } from "./tasksSlice";

const initialState = {
  currentUser: localStorage.getItem("currentUser") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", action.payload);
      const tasks =
        JSON.parse(localStorage.getItem("tasks_" + action.payload)) || [];
      // Dispatch the setTasks action to update tasks for this user
      setTasks(tasks);
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    register(state, action) {
      const { username, password } = action.payload;
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      if (!users.find((user) => user.username === username)) {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        state.currentUser = username;
        localStorage.setItem("currentUser", username);
        localStorage.setItem("tasks_" + username, JSON.stringify([])); // Initialize tasks for new user
      } else {
        alert("User already exists!");
      }
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;
