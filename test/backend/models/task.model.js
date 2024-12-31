import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required."],
      unique: false,
      trim: true, 
      minlength: [3, "Task title must be at least 3 characters long."],
      maxlength: [100, "Task title cannot exceed 100 characters."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters."],
    },
    status: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Due date must be in the future.",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


taskSchema.index({ title: 1, userId: 1 }, { unique: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
