import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/me", userController.getMyProfile);
router.put("/me", userController.updateMyProfile);
router.get("/me/stats", userController.getMyStats);
router.get("/:id", userController.getUserProfile);

export default router;
