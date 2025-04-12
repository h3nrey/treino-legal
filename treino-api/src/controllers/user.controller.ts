import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";
import { connect } from "http2";

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

export function getFavoritedExercises(req: AuthRequest, res: Response) {
  const { username } = req.user as { username: string };

  prisma.user
    .findUnique({
      where: {
        username,
      },
      include: {
        UserExercises: {
          include: {
            exercise: true,
          },
        },
      },
    })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user.UserExercises);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

export function favoriteExercise(req: AuthRequest, res: Response) {
  const { username } = req.user as { username: string };
  const exerciseId = req.params.exerciseId;

  if (!exerciseId) {
    res.status(400).json({ message: "Exercise ID is required" });
    return;
  }

  prisma.userExercises
    .create({
      data: {
        user: { connect: { username } },
        exercise: { connect: { id: parseInt(exerciseId) } },
      },
    })
    .then(() => {
      res.status(201).json({ message: "Exercise favorited" });
    })
    .catch((error) => {
      console.error("Error favoriting exercise:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

export async function unFavoriteExercise(req: AuthRequest, res: Response) {
  const { username } = req.user as { username: string };
  const exerciseId = req.params.exerciseId;

  if (!exerciseId) {
    res.status(400).json({ message: "Exercise ID is required" });
  }

  prisma.userExercises
    .deleteMany({
      where: {
        user: { username },
        exerciseId: parseInt(exerciseId),
      },
    })
    .then(() => {
      res.status(200).json({ message: "Exercise unfavorited" });
    })
    .catch((error) => {
      console.error("Error unfavoriting exercise:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

function generateToken(username: string) {
  const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
  });
  return token;
}
