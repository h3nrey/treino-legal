import { PrismaClient, TrainingType } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface TrainingRequest extends Request {
  query: {
    page?: string;
    count?: string;
    type?: TrainingType;
  };
}
export async function getTrainings(req: TrainingRequest, res: Response) {
  const query = req.query;
  const { page, count } = query;
  const selectQuery = {
    TraningExercises: {
      select: {
        exercise: {
          select: {
            name: true,
            description: true,
            usedMuscles: {
              select: { muscle: { select: { id: true, name: true } } },
            },
            thumbnailUrl: true,
          },
        },
      },
    },
  };

  const whereQuery: any = {
    isPublic: true,
  };

  if (query.type) whereQuery.type = query.type ?? undefined;

  const trainings = await prisma.training.findMany({
    skip: Number(page) * Number(count),
    take: Number(count),
    include: selectQuery,
    where: whereQuery,
  });

  res.json({
    data: trainings,
    currentPage: Number(page),
    totalCount: Number(count),
  });
}

export async function getTraining(req: Request, res: Response) {
  const id = req.params.id;

  const selectQuery = {};

  const training = await prisma.training.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      TraningExercises: {
        select: {
          exercise: {
            select: {
              name: true,
              description: true,
              thumbnailUrl: true,
              usedMuscles: {
                select: {
                  muscle: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  res.json({
    data: training,
  });
}

export async function createTraining(req: Request, res: Response) {
  const {
    title,
    description,
    duration,
    isPublic,
    thumbnailUrl,
    type,
    experienceLevel,
    userId,
    exercises,
  } = req.body;

  try {
    const newExercise = await prisma.training.create({
      data: {
        title,
        description,
        duration,
        isPublic,
        userId: userId,
        experienceLevel,
        type,
        TraningExercises: {
          create: exercises.map((e: { exerciseId: number }) => ({
            exercise: { connect: { id: e.exerciseId } },
          })),
        },
      },
    });
    res.status(201).json(newExercise.title);
  } catch (error) {
    res.status(400).json({ error: "Error creating training" });
  }
}
