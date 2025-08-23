// services/exercise.service.ts
import { buildExerciseWhere } from "../utils/exerciseWhereBuilder";
import {
  findExercises,
  countExercises,
  findById,
  create,
  update,
  deleteById,
} from "../repositories/exercise.repository";
import {
  CreateExerciseDto,
  CreateExerciseSchema,
  GetExercisesDto,
  UpdateExerciseDto,
} from "../dtos/exercise.dto";
import { paginate } from "../utils/pagination";
import { Prisma } from "@prisma/client";

export const listExercises = async (params: GetExercisesDto) => {
  const where = buildExerciseWhere(params);

  const [exercises, totalCount] = await Promise.all([
    findExercises({
      where,
      page: params.page,
      count: params.count,
      userId: params.userId,
      sortBy: params.sortBy,
      order: params.order,
    }),
    countExercises(where),
  ]);

  const mappedExercises = exercises.map((exercise) => ({
    ...exercise,
    favorited: params.userId ? exercise.UserExercises.length > 0 : false,
  }));

  return paginate(mappedExercises, totalCount, {
    page: params.page,
    pageSize: params.count,
    sortBy: params.sortBy,
    order: params.order,
  });
};

export const findExercise = async (id: number, userId?: string) => {
  const exercise = await findById(id, userId);
  if (!exercise) return null;

  return {
    ...exercise,
    favorited: userId ? exercise.UserExercises.length > 0 : false,
    usedMuscles: exercise.usedMuscles.map((um) => ({
      ...um.muscle,
      isPrimary: um.isPrimary,
    })),
  };
};

export const createNew = async (data: CreateExerciseDto) => {
  const newExercise = await create(data);
  return newExercise;
};

export const updateService = async (id: number, data: UpdateExerciseDto) => {
  const updatedExercise = await update(id, data);
  return updatedExercise;
};

export const deleteService = async (id: number) => {
  await deleteById(id);
};
