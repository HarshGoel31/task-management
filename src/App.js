import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import TaskManager from "./components/TaskManager";
import { setTasks } from "./redux/slices/tasksSlice";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [taskFilter, setTaskFilter] = useState("all"); // Task filter state

  useEffect(() => {
    if (currentUser) {
      const tasks =
        JSON.parse(localStorage.getItem("tasks_" + currentUser)) || [];
      dispatch(setTasks(tasks)); // Set tasks for the logged-in user
    }
  }, [currentUser, dispatch]);

  return (
    <div>
      {currentUser ? (
        <TaskManager taskFilter={taskFilter} setTaskFilter={setTaskFilter} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
