import { Router } from "express";
import {
  createTraining,
  favoriteTraining,
  getTraining,
  getTrainings,
  unfavoriteTraining,
} from "../controllers/training.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", getTrainings);
router.get("/:id", getTraining);
router.post("/", createTraining);
router.post("/favorites/:id", authMiddleware, favoriteTraining);
router.delete("/favorites/:id", authMiddleware, unfavoriteTraining);

export default router;
