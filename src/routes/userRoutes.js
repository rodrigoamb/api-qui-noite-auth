import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, userController.getMyProfile);
router.put("/me", authMiddleware, userController.updateMyProfile);
router.get("/me/stats", authMiddleware, userController.getMyStats);
router.get("/:id", authMiddleware, userController.getUserProfile);

export default router;
