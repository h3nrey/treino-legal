import { Router } from "express";
import {
  getExercises,
  createExercise,
  updateExercise,
  deleteExercise,
  getExerciseById,
} from "../controllers/exercise.controller";

const router = Router();

router.get("/", getExercises);
router.get("/:id", getExerciseById);
router.post("/", createExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;
