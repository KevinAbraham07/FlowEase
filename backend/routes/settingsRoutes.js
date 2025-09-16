import express from "express";
import settingsController from "../controllers/settingsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/google", authMiddleware, settingsController.saveGoogleCredentials);

export default router;

