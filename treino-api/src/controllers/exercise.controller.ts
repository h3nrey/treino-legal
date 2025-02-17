import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExercises = async (_req: Request, res: Response) => {
  const exercises = await prisma.exercise.findMany({
    include: { usedMuscles: { include: { muscle: true } } },
  });
  res.json(exercises);
};

export const getExercise = async (req: Request, res: Response) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      usedMuscles: { include: { muscle: true } },
      ExerciseInstruction: true,
      ExerciseTips: true,
      experienceLevel: true,
      equipament: true,
      grip: true,
    },
  });

  if (!exercise) return res.status(404).json({ error: "Exercise not found" });

  const formattedExercise = {
    ...exercise,
    usedMuscles: exercise.usedMuscles.map((um) => ({
      ...um.muscle,
      isPrimary: um.isPrimary,
    })),
  };

  res.json(formattedExercise);
};

export const createExercise = async (req: Request, res: Response) => {
  const {
    name,
    description,
    tutorialUrl,
    thumbnailUrl,
    riskLevel,
    experienceLevelId,
    gripId,
    equipamentId,
    muscles,
    instructions,
    tips,
  } = req.body;

  console.log(tips);

  try {
    const newExercise = await prisma.exercise.create({
      data: {
        name,
        description,
        experienceLevelId,
        gripId,
        tutorialUrl,
        thumbnailUrl,
        riskLevel,
        equipamentId,
        usedMuscles: {
          create: muscles.map((m: { muscleId: number; isPrimary: string }) => ({
            muscle: { connect: { id: m.muscleId } },
            isPrimary: m.isPrimary,
          })),
        },
        ExerciseInstruction: {
          create: instructions.map(
            (i: { step: number; description: string }) => ({
              step: i.step,
              description: i.description,
            })
          ),
        },
        ExerciseTips: {
          create: tips.map((t: { description: string }) => ({ description: t.description })),
        },
      },
      include: { usedMuscles: { include: { muscle: true } } },
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
    experienceLevelId,
    gripId,
    tutorialUrl,
    thumbnailUrl,
    riskLevel,
    instructions,
    tips,
  } = req.body;

  const muscles = req.body.muscles ?? [];
  console.log(tips);

  try {
    const updatedExercise = await prisma.exercise.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        description,
        experienceLevelId,
        gripId,
        tutorialUrl,
        thumbnailUrl,
        riskLevel,
        usedMuscles: {
          deleteMany: {},
          create: muscles.map((m: { muscleId: number; isPrimary: string }) => ({
            muscle: { connect: { id: m.muscleId } },
            isPrimary: m.isPrimary,
          })),
        },
        ExerciseInstruction: {
          deleteMany: {},
          create: instructions.map(
            (i: { step: number; description: string }) => ({
              step: i.step,
              description: i.description,
            })
          ),
        },
        ExerciseTips: {
          deleteMany: {},
          create: tips.map((t: { description: string }) => ({ description: t.description })),
        }
      },
      include: { usedMuscles: { include: { muscle: true } } },
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
      where: { exerciseId: Number(req.params.id) },
    });

    await prisma.exercise.delete({ where: { id: Number(req.params.id) } });

    res.json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(404).json({ error: "Exercise not found" });
  }
};
