import Task from "../models/task.model.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required." });
    }

    const allowedPriorities = ["low", "medium", "high"];
    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority. Allowed values: low, medium, high." });
    }

    if (dueDate && new Date(dueDate) <= new Date()) {
      return res.status(400).json({ message: "Due date must be in the future." });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      userId: req.user.id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error while creating the task." });
  }
};

// Get all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error while fetching tasks." });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task ID." });
    }
    res.status(500).json({ message: "Server error while fetching the task." });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task ID." });
    }
    res.status(500).json({ message: "Server error while updating the task." });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid task ID." });
    }
    res.status(500).json({ message: "Server error while deleting the task." });
  }
};
