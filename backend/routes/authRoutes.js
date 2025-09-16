import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/login", authController.login);
router.get("/callback", authController.callback);

router.get("/me", authMiddleware, authController.me)
router.get("/logout", authController.logout);

export default router;
