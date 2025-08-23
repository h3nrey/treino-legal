import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { GetExercisesSchema } from "../dtos/exercise.dto";
import { getExercisesService } from "../services/exercise.service";

const prisma = new PrismaClient();

export const getExercises = async (req: Request, res: Response) => {
  try {
    const params = GetExercisesSchema.parse(req.query);
    const result = await getExercisesService(params);
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
  const userId = req.query.userId as string;

  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      usedMuscles: { include: { muscle: true } },
      ExerciseInstruction: true,
      ExerciseTips: true,
      experienceLevel: true,
      equipament: true,
      grip: true,
      UserExercises: userId
        ? {
            where: { userId: userId },
            select: { id: true },
          }
        : false,
    },
  });

  if (!exercise) {
    res.status(404).json({ error: "Exercise not found" });
    return;
  }

  const formattedExercise = {
    ...exercise,
    favorited: userId ? exercise.UserExercises.length > 0 : false,
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
          create: tips.map((t: { description: string }) => ({
            description: t.description,
          })),
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
  } = req.body;

  const muscles = req.body.muscles ?? null;
  const instructions = req.body.instructions ?? null;
  const tips = req.body.tips ?? null;
  console.log(req.params.id);

  try {
    const updateData: any = {
      name,
      description,
      experienceLevelId,
      gripId,
      tutorialUrl,
      thumbnailUrl,
      riskLevel,
      ...(muscles?.length && {
        usedMuscles: {
          deleteMany: {},
          create: muscles.map((m: { muscleId: number; isPrimary: string }) => ({
            muscle: { connect: { id: m.muscleId } },
            isPrimary: m.isPrimary,
          })),
        },
      }),
      ...(instructions?.length && {
        ExerciseInstruction: {
          deleteMany: {},
          create: instructions.map(
            (i: { step: number; description: string }) => ({
              step: i.step,
              description: i.description,
            })
          ),
        },
      }),
      ...(tips?.length && {
        ExerciseTips: {
          deleteMany: {},
          create: tips.map((t: { description: string }) => ({
            description: t.description,
          })),
        },
      }),
    };

    const updatedExercise = await prisma.exercise.update({
      where: { id: Number(req.params.id) },
      data: updateData,
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
