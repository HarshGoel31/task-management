# Task Manager Application

This project is a simple Task Manager application built using **React.js** and **Redux**. It allows users to add, edit, delete, and filter tasks. Users can also mark tasks as completed or incomplete. The application supports filtering tasks based on their completion status and includes a logout feature.

---

## Hosted Application

The application is hosted on GitHub Pages. You can access it here:
[Task Manager Application](https://harshgoel31.github.io/task-management/)

---

## Features

1. **Add Tasks:** Users can add new tasks with a title.
2. **Edit Tasks:** Edit the title of existing tasks.
3. **Delete Tasks:** Remove tasks from the list.
4. **Mark Tasks as Complete/Incomplete:** Toggle the completion status of tasks.
5. **Filter Tasks:** Filter tasks based on their status (All, Completed, or Incomplete).
6. **Logout:** Simulate user logout functionality.
7. **Optimized Rendering:** The application is optimized using `React.memo`, `useCallback`, and `useMemo` to prevent unnecessary re-renders and enhance performance.

---

## File Structure

### Components
- **Login.jsx:** Component for handling user login/register functionality. It manages user credentials and authentication logic.
- **TaskManager.jsx:** The main component responsible for rendering the Task Manager UI and managing task operations.

### Redux
- **tasksSlice.jsx:** Manages the state and actions related to tasks.
- **userSlice.jsx:** Manages the state and actions related to user authentication (e.g., logout).
- **store.jsx:** Combines Redux slices and configures the store for the application.

---

## Technologies Used

- **React.js**: Frontend library for building the UI.
- **Redux**: State management library.
- **Material-UI (MUI)**: UI components for styling and layout.

---

## Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (v14 or above)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/HarshGoel31/task-management.git
   ```
2. Navigate to the project directory:
   ```bash
   cd task-management
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Usage

1. **Add a Task:** Enter a task title in the input field and click the "Add Task" button.
2. **Mark as Complete/Incomplete:** Click the checkbox icon next to a task to toggle its completion status.
3. **Edit a Task:** Click the edit icon next to a task, modify the title in the input field, and click "Save."
4. **Delete a Task:** Click the delete icon next to a task to remove it.
5. **Filter Tasks:** Use the dropdown to filter tasks by their status (All, Completed, or Incomplete).
6. **Logout:** Click the "Logout" button to simulate user logout.
