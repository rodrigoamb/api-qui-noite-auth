import { Router } from "express";
import adRoutes from "./adRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/ads", adRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);

export default router;
