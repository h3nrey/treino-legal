import { GetExercisesDto } from "../dtos/exercise.dto";
import { GetTrainingsDto } from "../dtos/training.dto";

export const buildTrainingWhere = (params: GetTrainingsDto) => {
  const where: any = {};

  if (params.type) {
    where.type = { in: [params.type ]};
  }

  return where;
};
