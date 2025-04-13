import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export interface AuthRequest extends Request {
  user?: { username: string; id: string };
}
export const authMiddleware: RequestHandler = async (
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
    const user = await prisma.user.findUnique({
      where: { username: (decoded as any).username },
    });
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // req.user = decoded as { username: string };
    req.user = { username: user?.username, id: user?.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
