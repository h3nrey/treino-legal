import { Router } from "express";
import {
  createTraining,
  getTraining,
  getTrainings,
  // getTraining,
  // createTraining,
  // updateTraining,
  // deleteTraining,
} from "../controllers/training.controller";

const router = Router();

router.get("/", getTrainings);
router.get("/:id", getTraining);
router.post("/", createTraining);

export default router;
