import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

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

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
    },
  });

  const userToken = generateToken(username);

  res.status(201).json({ token: userToken, user: { username, email } });
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

function generateToken(username: string) {
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
  });
  return token;
}
