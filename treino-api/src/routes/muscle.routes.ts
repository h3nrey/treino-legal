import { Router } from "express";
import { listMuscles } from "../controllers/muscle.controller";
const router = Router();

router.get("/", listMuscles)

export default router;
