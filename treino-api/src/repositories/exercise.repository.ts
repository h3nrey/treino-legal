// repositories/exercise.repository.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findExercises = async ({
  where,
  page,
  count,
  userId,
  sortBy,
  order,
}: {
  where: any;
  page: number;
  count: number;
  userId?: string;
  sortBy: string;
  order: "asc" | "desc";
}) => {
  return prisma.exercise.findMany({
    where,
    skip: page * count,
    take: count,
    orderBy: { [sortBy]: order },
    include: {
      usedMuscles: { include: { muscle: true } },
      UserExercises: userId
        ? {
            where: { userId },
            select: { id: true },
          }
        : false,
    },
  });
};

export const countExercises = async (where: any) =>
  prisma.exercise.count({ where });
