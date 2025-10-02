import Task from "../Models/tasks.model.js";

//////New Task
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id,
    });

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all task
export const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === "ADMIN") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ user: req.user.id });
    }
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ error: error.message });
  }
};

//gte single task

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error("Get Task Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.user.role !== "ADMIN" && task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, status } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    if (req.user.role !== "ADMIN" && task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
