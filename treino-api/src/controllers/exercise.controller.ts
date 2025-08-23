import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {
  CreateExerciseSchema,
  GetExercisesSchema,
  UpdateExerciseSchema,
} from "../dtos/exercise.dto";
import {
  createNew,
  deleteService,
  findExercise,
  listExercises,
  updateService,
} from "../services/exercise.service";

const prisma = new PrismaClient();

export const getExercises = async (req: Request, res: Response) => {
  try {
    const params = GetExercisesSchema.parse(req.query);
    const result = await listExercises(params);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  }
};

export const getExerciseById = async (req: Request, res: Response) => {
  const userId = req.query.userId as string | undefined;
  const exerciseId = Number(req.params.id);
  const exercise = await findExercise(exerciseId, userId);

  if (!exercise) {
    return res.status(404).json({ error: "Exercise not found" });
  }

  return res.json(exercise);
};

export const createExercise = async (req: Request, res: Response) => {
  try {
    const dto = CreateExerciseSchema.parse(req.body);
    const newExercise = await createNew(dto);

    return res.status(201).json(newExercise);
  } catch (error: any) {
    if (error?.issues)
      return res
        .status(400)
        .json({ error: "Validation Failed", details: error.issues });

    res.status(500).json({ error: "Error creating exercise" });
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const exerciseId = Number(req.params.id);

  try {
    const dto = UpdateExerciseSchema.parse(req.body);
    console.log(dto);
    const updatedExercise = await updateService(exerciseId, dto);

    res.json(updatedExercise);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Exercise not updated" });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  const exerciseId = Number(req.params.id);
  try {
    await deleteService(exerciseId);
    return res.json({ message: "Deleted Successfully" });
  } catch (error) {
    return res.status(404).json({ error: "Exercise not found" });
  }
};
