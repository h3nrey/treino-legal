import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExercises = async (_req: Request, res: Response) => {
  const exercises = await prisma.exercise.findMany({
    include: { muscles_exercises: { include: { muscle: true } } },
  });
  res.json(exercises);
};

export const getExercise = async (req: Request, res: Response) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(req.params.id) },
    include: { muscles_exercises: { include: { muscle: true } } },
  });

  if (!exercise) return res.status(404).json({ error: "Exercise not found" });
  res.json(exercise);
};

export const createExercise = async (req: Request, res: Response) => {
  const {
    name,
    description,
    experience_level_id,
    grip_id,
    tutorial_url,
    risk_level,
    muscles,
  } = req.body;

  try {
    const newExercise = await prisma.exercise.create({
      data: {
        name,
        description,
        experience_level_id,
        grip_id,
        tutorial_url,
        risk_level,
        muscles_exercises: {
          create: muscles.map(
            (m: { muscle_id: number; level_type: string }) => ({
              muscle: { connect: { id: m.muscle_id } },
              level_type: m.level_type,
            })
          ),
        },
      },
      include: { muscles_exercises: { include: { muscle: true } } },
    });

    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ error: "Error creating exercise" });
    console.log(error);
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const {
    name,
    description,
    experience_level_id,
    grip_id,
    tutorial_url,
    risk_level,
  } = req.body;

  const muscles = req.body.muscles ?? [];

  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        description,
        experience_level_id,
        grip_id,
        tutorial_url,
        risk_level,
        muscles_exercises: {
          deleteMany: {},
          create: muscles.map(
            (m: { muscle_id: number; level_type: string }) => ({
              muscle: { connect: { id: m.muscle_id } },
              level_type: m.level_type,
            })
          ),
        },
      },
      include: { muscles_exercises: { include: { muscle: true } } },
    });

    res.json(updatedExercise);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Exercise not found" });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  try {
    await prisma.musclesExercises.deleteMany({
      where: { exercise_id: Number(req.params.id) },
    });

    await prisma.exercise.delete({ where: { id: Number(req.params.id) } });

    res.json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(404).json({ error: "Exercise not found" });
  }
};
