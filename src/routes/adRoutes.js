import { Router } from "express";
import * as adController from "../controllers/adController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", adController.getAllAds);
router.get("/my-ads", authMiddleware, adController.getMyAds);
router.get("/:id", authMiddleware, adController.getAdById);
router.post("/", authMiddleware, adController.createAd);
router.put("/:id", authMiddleware, adController.updateAd);
router.delete("/:id", authMiddleware, adController.deleteAd);

export default router;
