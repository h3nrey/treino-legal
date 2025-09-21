import { PrismaClient } from '@prisma/client';
import { CreateTrainingsDto } from '../dtos/training.dto';

const prisma = new PrismaClient();

export const list = async ({
  where,
  page,
  count,
  orderBy,
  userId,
}: {
  where: any;
  page: number;
  count: number;
  userId?: string;
  orderBy: any;
}) => {
  console.log(where);
  return await prisma.training.findMany({
    where,
    include: {
      TraningExercises: {
        include: {
          exercise: true,
        },
      },
      favoritedByUsers: userId
        ? { where: { userId }, select: { userId: true } }
        : false,
    },
    take: count,
    skip: page * count,
    orderBy,
  });
};

export const listRelated = async (
  id: number,
  userId: string | null,
  count = 5,
) => {
  const training = await prisma.training.findUnique({
    where: {
      id,
    },
    include: {
      TraningExercises: {
        include: {
          exercise: {
            include: {
              usedMuscles: {
                include: { muscle: true },
              },
            },
          },
        },
      },
    },
  });

  if (!training) return [];

  const muscleIds = training.TraningExercises.flatMap((te) =>
    te.exercise.usedMuscles.map((um) => um.muscle.id),
  );

  const related = await prisma.training.findMany({
    where: {
      id: { not: id },
      // OR: [
      //   { goal: training.goal },
      //   {
      //     TraningExercises: {
      //       some: {
      //         exercise: {
      //           usedMuscles: {
      //             some: {
      //               muscleId: { in: muscleIds },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // ],
    },
    take: count,
  });

  return related;
};

export const findOne = async (id: number, userId: string | null = null) => {
  return await prisma.training.findUnique({
    where: {
      id,
    },
    include: {
      favoritedByUsers: userId
        ? { where: { userId }, select: { userId: true } }
        : false,
      TraningExercises: {
        include: {
          exercise: {
            select: {
              name: true,
              ExerciseInstruction: true,
              usedMuscles: {
                where: {
                  isPrimary: true,
                },
                select: {
                  muscle: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              equipament: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  });
};

export const create = async (data: CreateTrainingsDto) => {
  return await prisma.training.create({
    data: {
      title: data.title,
      description: data.description,
      duration: data.duration,
      isPublic: data.isPublic,
      thumbnailUrl: data.thumbnailUrl,
      goal: data.goal,
      experienceLevel: data.experienceLevel,
      userId: data.userId,
      TraningExercises: {
        create: data.exercises.map((exercise) => ({
          exercise: { connect: { id: exercise.exerciseId } },
        })),
      },
    },
  });
};

export const favorite = async (userId: string, trainingId: number) => {
  return await prisma.favoritedTrainings.create({
    data: {
      user: { connect: { id: userId } },
      training: { connect: { id: trainingId } },
    },
  });
};

export const unfavorite = async (userId: string, trainingId: number) => {
  return await prisma.favoritedTrainings.deleteMany({
    where: {
      userId,
      trainingId,
    },
  });
};

export const count = async (where: any) => {
  const count = await prisma.training.count({
    where,
  });
  return count;
};
