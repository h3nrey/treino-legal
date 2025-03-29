import { Router } from "express";
import { createUser } from "../controllers/user.controller";
const router = Router();

router.get("/:id");
router.post("/signup", createUser);
router.post("login");

export default router;
