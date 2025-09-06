import { data } from "cheerio/dist/commonjs/api/attributes";
import * as repository from "../repositories/training.repository";
import { paginate } from "../utils/pagination";
import { buildTrainingOrderBy } from "../utils/trainingOrderByBuilder";
import { buildTrainingWhere } from "../utils/trainingWhereBuilder";
import { CreateTrainingsDto } from "../dtos/training.dto";

export const listTrainings = async (params: any) => {
  const where = buildTrainingWhere(params);
  const orderBy = buildTrainingOrderBy(params);

  console.log(where);
  const [trainings, totalCount] = await Promise.all([
    repository.list({
      where,
      page: params.page,
      count: params.count,
      orderBy,
      userId: params.userId,
    }),
    repository.count(where),
  ]);

  const trainingsWithFavorites = trainings.map((training) => ({
    ...training,
    favorited: params.userId ? training.favoritedByUsers.length > 0 : false,
  }));

  return paginate(trainingsWithFavorites, totalCount, {
    page: params.page,
    pageSize: params.count,
    sortBy: params.sortBy,
    order: params.order,
  });
};

export const findOne = async (id: number, userId: string | undefined) => {
  const foundExercise = await repository.findOne(id, userId);

  return {
    ...foundExercise,
    favorited: userId ? foundExercise?.favoritedByUsers.length! > 0 : false,
  };
};

export const createTrainings = async (data: CreateTrainingsDto) => {
  return await repository.create(data);
};  


export const favorite = async (userId: string, trainingId: number) => {
  return await repository.favorite(userId, trainingId);
};

export const unfavorite = async (userId: string, trainingId: number) => {
  return await repository.unfavorite(userId, trainingId);
};