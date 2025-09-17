import express from "express";
import { getTaskStats } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", getTaskStats);

export default router;
