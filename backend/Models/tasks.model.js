// import mongoose from "mongoose";

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   status: { type: String, enum: ["PENDING", "COMPLETED"], default: "PENDING" },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: Date.now },
// });

// const Task = mongoose.model("Task", taskSchema);
// export default Task;

// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["PENDING", "COMPLETED"], default: "PENDING" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
