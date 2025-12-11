import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, categoryController.getAllCategories);
router.get("/slug/:slug", authMiddleware, categoryController.getCategoryBySlug);
router.get("/:id", authMiddleware, categoryController.getCategoryById);
router.get("/:id/ads", authMiddleware, categoryController.getAdsByCategory);
router.post("/", authMiddleware, categoryController.createCategory);
router.put("/:id", authMiddleware, categoryController.updateCategory);
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

export default router;
