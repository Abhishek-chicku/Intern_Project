

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "PENDING" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  
  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      setError(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  
  const handleAddTask = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newTask.title.trim()) return setError("Title cannot be empty");

    try {
      const response = await api.post("/tasks", newTask);
      setTasks((prev) => [...prev, response.data.task]);
      setNewTask({ title: "", description: "", status: "PENDING" });
      setSuccess("Task added successfully");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add task");
    }
  };

  
  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setSuccess("Task deleted successfully");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        {/* <button className="btn btn-warning" onClick={handleLogout}>
          Logout
        </button> */}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form className="mb-4" onSubmit={handleAddTask}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-1"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <select
            className="form-control"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Add Task
        </button>
      </form>

      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-4 mb-3" key={task._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description || "No description"}</p>
                <p className="mb-1"><strong>Status:</strong> {task.status}</p>
                {task.user && (
                  <p className="mb-3"><strong>User:</strong> {task.user.email || task.user}</p>
                )}
                <button
                  className="btn btn-danger mt-auto"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
