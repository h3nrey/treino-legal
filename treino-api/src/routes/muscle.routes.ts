import { Router } from "express";
import { getMuscle, listMuscles } from "../controllers/muscle.controller";
const router = Router();

router.get("/", listMuscles)
router.get("/:musclename", getMuscle)

export default router;
