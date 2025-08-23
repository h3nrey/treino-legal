// repositories/exercise.repository.ts
import { Prisma, PrismaClient } from "@prisma/client";
import { CreateExerciseDto, UpdateExerciseDto } from "../dtos/exercise.dto";

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

export const findById = async (id: number, userId?: string) => {
  return prisma.exercise.findUnique({
    where: { id },
    include: {
      usedMuscles: { include: { muscle: true } },
      ExerciseInstruction: true,
      ExerciseTips: true,
      experienceLevel: true,
      equipament: true,
      grip: true,
      UserExercises: userId
        ? { where: { userId }, select: { id: true } }
        : false,
    },
  });
};

export const create = async (dto: CreateExerciseDto) =>
  await prisma.exercise.create({
    data: {
      name: dto.name,
      description: dto.description,
      tutorialUrl: dto.tutorialUrl,
      thumbnailUrl: dto.thumbnailUrl,
      riskLevel: dto.riskLevel,
      experienceLevelId: dto.experienceLevelId,
      gripId: dto.gripId,
      equipamentId: dto.equipamentId,
      usedMuscles: {
        create: dto.muscles.map((m) => ({
          muscle: { connect: { id: m.muscleId } },
          isPrimary: m.isPrimary,
        })),
      },
      ExerciseInstruction: {
        create: dto.instructions.map((i) => ({
          step: i.step,
          description: i.description,
        })),
      },
      ExerciseTips: {
        create: dto.tips.map((t) => ({
          description: t.description,
        })),
      },
    },
  });

export const update = async (id: number, dto: UpdateExerciseDto) => {
  const updateData: any = {
    name: dto.name,
    description: dto.description,
    tutorialUrl: dto.tutorialUrl,
    thumbnailUrl: dto.thumbnailUrl,
    riskLevel: dto.riskLevel,
    experienceLevelId: dto.experienceLevelId,
    gripId: dto.gripId,
    equipamentId: dto.equipamentId,
  };

  if (dto.muscles !== undefined) {
    updateData.usedMuscles = {
      deleteMany: {},
      create: dto.muscles.map((m) => ({
        muscle: { connect: { id: m.muscleId } },
        isPrimary: m.isPrimary,
      })),
    };
  }

  if (dto.instructions !== undefined) {
    updateData.ExerciseInstruction = {
      deleteMany: {},
      create: dto.instructions.map((i) => ({
        step: i.step,
        description: i.description,
      })),
    };
  }

  if (dto.tips !== undefined) {
    updateData.ExerciseTips = {
      deleteMany: {},
      create: dto.tips.map((t) => ({
        description: t.description,
      })),
    };
  }

  return prisma.exercise.update({
    where: { id },
    data: updateData,
  });
};

export const deleteById = async (id: number) => {
  await prisma.exercise.delete({
    where: { id },
  });
};

export const countExercises = async (where: any) =>
  prisma.exercise.count({ where });
