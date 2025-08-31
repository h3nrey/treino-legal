import { PrismaClient, TrainingType } from "@prisma/client";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import  * as service from "../services/training.service";
import { CreateTrainingsSchema, GetTrainingsSchema } from "../dtos/training.dto";

const prisma = new PrismaClient();


export async function list(req: Request, res: Response) {
  try {
    const params = GetTrainingsSchema.parse(req.query);
    const result = await service.listTrainings(params);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  }
}

export async function findOne(req: Request, res: Response) {
  const id = Number(req.params.id);
  const userId = req.query.userId as string | undefined;

  const training = await service.findOne(id, userId);
  
  if (!training) {
    return res.status(404).json({ error: "Training not found" });
  }

  return res.json(training);
}

export async function create(req: Request, res: Response) {
  try {
    console.log("Creating new training:", req.body);
    const dto = CreateTrainingsSchema.parse(req.body);
    const newTraining = await service.createTrainings(dto);
    return res.status(201).json(newTraining);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: "Invalid request" });
    }
  }
}

export async function favorite(req: AuthRequest, res: Response) {
  const { id } = req.user as { id: string };
  const trainingId = req.params.id;

  if (!trainingId) {
    res.status(400).json({ message: "Training ID is required" });
    return;
  }

  await service.favorite(id, parseInt(trainingId))
    .then(() => {
      res.status(201).json({ message: "Training favorited" });
    })
    .catch((error) => {
      console.error("Error favoriting training: ", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

export async function unfavoriteTraining(req: AuthRequest, res: Response) {
  const { id } = req.user as { id: string };
  const trainingId = parseInt(req.params.id);

  if (!trainingId) {
    res.status(400).json({ message: "Training ID is required" });
    return;
  }

  await service.unfavorite(id, trainingId)
    .then(() => {
      res.status(200).json({ message: "Training unfavorited" });
    })
    .catch((error) => {
      console.error("Error unfavoriting training:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}
