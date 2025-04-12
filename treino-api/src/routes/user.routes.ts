import { Router } from "express";
import {
  createUser,
  favoriteExercise,
  getFavoritedExercises,
  getMe,
  loginUser,
  unFavoriteExercise,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";
const router = Router();

router.get("/me", authMiddleware, getMe);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/me/favorites", authMiddleware, getFavoritedExercises);
router.post("/me/favorites/:exerciseId", authMiddleware, favoriteExercise);
router.delete("/me/favorites/:exerciseId", authMiddleware, unFavoriteExercise);

export default router;
