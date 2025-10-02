import { Router } from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../Controller/TaskController.js";
import { protect } from "../middleware/authMiddleware.js";

////Task routes

const router = Router();
router.use(protect);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// router.get("/admin/all", admin, getTasks);

export default router;
