import { PrismaClient, TrainingType } from "@prisma/client";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { listTrainings } from "../services/training.service";
import { GetTrainingsSchema } from "../dtos/training.dto";

const prisma = new PrismaClient();

interface TrainingRequest extends Request {
  query: {
    page?: string;
    count?: string;
    type?: TrainingType;
  };
}
// export async function getTrainings(req: TrainingRequest, res: Response) {
//   const query = req.query;
//   const { page, count } = query;
//   const selectQuery = {
//     TraningExercises: {
//       select: {
//         exercise: {
//           select: {
//             name: true,
//             description: true,
//             usedMuscles: {
//               select: { muscle: { select: { id: true, name: true } } },
//             },
//             thumbnailUrl: true,
//           },
//         },
//       },
//     },
//   };

//   const whereQuery: any = {
//     isPublic: true,
//   };

//   if (query.type) whereQuery.type = query.type ?? undefined;

//   const trainings = await prisma.training.findMany({
//     skip: Number(page ?? 0) * Number(count ?? 5),
//     take: Number(count ?? 5),
//     include: selectQuery,
//     where: whereQuery,
//   });

//   res.json({
//     data: trainings,
//     currentPage: Number(page),
//     totalCount: Number(count),
//   });
// }

export async function getTrainings(req: Request, res: Response) {
  try {
    const params = GetTrainingsSchema.parse(req.query);
    const result = await listTrainings(params);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  }
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
          sets: true,
          reps: true,
          exercise: {
            select: {
              id: true,
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

export async function favoriteTraining(req: AuthRequest, res: Response) {
  const { username } = req.user as { username: string };
  const trainingId = req.params.id;

  if (!trainingId) {
    res.status(400).json({ message: "Training ID is required" });
    return;
  }

  prisma.userTranings
    .create({
      data: {
        user: { connect: { username } },
        training: { connect: { id: parseInt(trainingId) } },
      },
    })
    .then(() => {
      res.status(201).json({ message: "Training favorited" });
    })
    .catch((error) => {
      console.error("Error favoriting training: ", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

export async function unfavoriteTraining(req: AuthRequest, res: Response) {
  const { username } = req.user as { username: string };
  const trainingId = req.params.id;

  if (!trainingId) {
    res.status(400).json({ message: "Training ID is required" });
    return;
  }

  await prisma.userTranings
    .deleteMany({
      where: {
        user: { username },
        trainingId: parseInt(trainingId),
      },
    })
    .then(() => {
      res.status(200).json({ message: "Training unfavorited" });
    })
    .catch((error) => {
      console.error("Error unfavoriting training:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}
