import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { login } from "../redux/slices/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and register forms
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  // Handle Login
  const handleLogin = () => {
    if (username && password) {
      const storedUser = localStorage.getItem("user_" + username);
      if (storedUser && JSON.parse(storedUser).password === password) {
        dispatch(login(username));
      } else {
        setError("Invalid username or password");
      }
    } else {
      setError("Please fill out all fields.");
    }
  };

  // Handle Registration
  const handleRegister = () => {
    if (username && password) {
      const storedUser = localStorage.getItem("user_" + username);
      if (storedUser) {
        setError("User already exists!");
      } else {
        // Save the user to localStorage
        localStorage.setItem(
          "user_" + username,
          JSON.stringify({ username, password })
        );
        setIsLogin(true); // Switch to login form after successful registration
        setError("");
      }
    } else {
      setError("Please fill out all fields.");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isLogin ? "Login" : "Register"}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={isLogin ? handleLogin : handleRegister}
      >
        {isLogin ? "Login" : "Register"}
      </Button>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              setIsLogin(!isLogin); // Toggle between login and register form
              setError("");
            }}
          >
            {isLogin ? "Register here" : "Login here"}
          </Button>
        </Typography>
      </Box>
    </Paper>
  );
}

export default Login;
