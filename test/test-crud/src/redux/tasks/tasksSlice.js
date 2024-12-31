import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utlis/clientApi.js";

// Fetch all tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/tasks");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch tasks");
  }
});

// Add a new task
export const createTask = createAsyncThunk("tasks/createTask", async (taskData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to create task");
  }
});

// Update a task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ taskId, updatedData }, { rejectWithValue }) => {
      try {
        const response = await apiClient.put(`/tasks/${taskId}`, updatedData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update task");
      }
    }
  );

// Delete a task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId, { rejectWithValue }) => {
  try {
    await apiClient.delete(`/tasks/${taskId}`);
    return taskId;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to delete task");
  }
});

// Redux Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Tasks
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create Task
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Update Task
    builder.addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
      builder.addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      });

    // Delete Task
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default tasksSlice.reducer;
