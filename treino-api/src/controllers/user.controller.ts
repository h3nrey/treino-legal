import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  console.log(req.body);
  if (!username || !email || !password) {
    res.status(400).json({ message: "not all mandatory fields was provided" });
  }

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    res.status(401).json({ message: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    if (!createUser) {
      res.status(500).json({ message: "User not created" });
      return;
    }

    const userToken = generateToken(username);

    res.status(201).json({ token: userToken, user: { username, email } });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "not all mandatory fields was provided" });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid password" });
  }

  const userToken = generateToken(username);

  res
    .status(200)
    .json({ token: userToken, user: { username, email: user.email } });
}

export function getMe(req: AuthRequest, res: Response) {
  res.json(req.user);
}

function generateToken(username: string) {
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
  });
  return token;
}
