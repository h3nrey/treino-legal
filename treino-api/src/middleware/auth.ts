import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";

export interface AuthRequest extends Request {
  user?: { username: string };
}
export const authMiddleware: RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as { username: string };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
