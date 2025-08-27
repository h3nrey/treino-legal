import { GetExercisesDto } from "../dtos/exercise.dto";

export const buildTrainingWhere = (params: GetExercisesDto) => {
  const where: any = {};

  // if (params.type) {
  //   where.type = { is: { name: params.type } };
  // }

  return where;
};
