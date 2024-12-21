import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircle,
  Delete,
  Edit,
  Logout,
  RadioButtonUnchecked,
  AddTask,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  addTask,
  deleteTask,
  editTask,
  toggleTaskCompletion,
} from "../redux/slices/tasksSlice";
import { logout } from "../redux/slices/userSlice";

// TaskItem Component wrapped with React.memo
const TaskItem = React.memo(
  ({
    task,
    index,
    dispatch,
    editingIndex,
    setEditingIndex,
    editedTitle,
    setEditedTitle,
    handleSaveEdit,
    handleCancelEdit,
    handleEditTask,
  }) => {
    return (
      <ListItem
        fullWidth
        key={index}
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <IconButton onClick={() => dispatch(toggleTaskCompletion(index))}>
          {task.completed ? (
            <CheckCircle color="primary" />
          ) : (
            <RadioButtonUnchecked />
          )}
        </IconButton>
        {editingIndex === index ? (
          <Grid
            container
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <Grid item xs={8}>
              <TextField
                value={editedTitle}
                fullWidth
                onChange={(e) => setEditedTitle(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={4}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleSaveEdit(index)}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            sx={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <Grid item xs={10}>
              <ListItemText
                primary={task.title}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                }}
              />
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <IconButton onClick={() => handleEditTask(index)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => dispatch(deleteTask(index))}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </ListItem>
    );
  }
);

function TaskManager({ taskFilter, setTaskFilter }) {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleAddTask = useCallback(() => {
    if (newTask.trim()) {
      dispatch(addTask({ title: newTask, completed: false }));
      setNewTask("");
    } else {
      alert("Task title cannot be empty.");
    }
  }, [newTask, dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleEditTask = useCallback(
    (index) => {
      setEditingIndex(index);
      setEditedTitle(tasks[index].title);
    },
    [tasks]
  );

  const handleSaveEdit = useCallback(
    (index) => {
      if (editedTitle.trim()) {
        dispatch(
          editTask({
            index,
            updatedTask: { ...tasks[index], title: editedTitle },
          })
        );
        setEditingIndex(null);
      } else {
        alert("Task title cannot be empty.");
      }
    },
    [editedTitle, dispatch, tasks]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingIndex(null);
  }, []);

  const handleFilterChange = useCallback(
    (event) => {
      setTaskFilter(event.target.value);
    },
    [setTaskFilter]
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (taskFilter === "completed") return task.completed;
      if (taskFilter === "incomplete") return !task.completed;
      return true; // Show all tasks
    });
  }, [tasks, taskFilter]);

  return (
    <Paper elevation={6} sx={{ maxWidth: 800, mx: "auto", mt: 8, p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="h4" sx={{ m: 0 }} gutterBottom>
          Task Manager
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <FormControl fullWidth>
        <Select value={taskFilter} onChange={handleFilterChange}>
          <MenuItem value="all">All Tasks</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="incomplete">Incomplete</MenuItem>
        </Select>
      </FormControl>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          my: 4,
        }}
      >
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            onClick={handleAddTask}
            startIcon={<AddTask />}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
      <List>
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            dispatch={dispatch}
            index={index}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            handleSaveEdit={handleSaveEdit}
            handleCancelEdit={handleCancelEdit}
            handleEditTask={handleEditTask}
          />
        ))}
      </List>
    </Paper>
  );
}

export default TaskManager;
