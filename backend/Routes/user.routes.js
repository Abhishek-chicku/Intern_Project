import { Router } from "express";
import { register, login } from "../Controller/authController.js";

const router = Router();

//User Routes

router.post("/register", register);
router.post("/login", login);

export default router;
