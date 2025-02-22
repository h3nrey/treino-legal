import { Router } from "express";
import { listEquipaments } from "../controllers/equipament.controller";

const router = Router();

router.get("/", listEquipaments);

export default router;