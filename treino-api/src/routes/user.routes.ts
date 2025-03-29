import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";
const router = Router();

router.get("/:id");
router.post("/signup", createUser);
router.post("/login", loginUser);

export default router;
