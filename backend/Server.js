import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./Routes/user.routes.js";
import tasksRoutes from "./Routes/tasks.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const connectDb = async () => {
  try {
    if (!MONGO_URL) throw new Error("MONGO_URL is missing in .env");
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (e) {
    console.error("MongoDB connection error:", e.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
};

startServer();
