import { GetExercisesDto } from "../dtos/exercise.dto";

export const buildExerciseWhere = (params: GetExercisesDto) => {
  const where: any = {};

  if (params.equipament) {
    where.equipament = { is: { name: params.equipament } };
  }

  if (params.muscle) {
    where.usedMuscles = { some: { muscle: { name: params.muscle } } };
  }

  if (params.search) {
    where.name = { contains: params.search, mode: "insensitive" };
  }

  return where;
};
