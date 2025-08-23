// services/exercise.service.ts
import { buildExerciseWhere } from "../utils/exerciseWhereBuilder";
import {
  findExercises,
  countExercises,
} from "../repositories/exercise.repository";
import { GetExercisesDto } from "../dtos/exercise.dto";
import { paginate } from "../utils/pagination";

export const getExercisesService = async (params: GetExercisesDto) => {
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
