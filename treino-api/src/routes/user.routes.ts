import { Router } from "express";
import { createUser, getMe, loginUser } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";
const router = Router();

router.get("/:id", authMiddleware, getMe);
router.post("/signup", createUser);
router.post("/login", loginUser);

export default router;
