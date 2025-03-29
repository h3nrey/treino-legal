import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface AuthRequest extends Request {
  user?: { username: string };
}
export const authMiddleware: RequestHandler = (req: any, res: any, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as { username: string };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
