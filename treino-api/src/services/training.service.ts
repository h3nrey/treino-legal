import { count, find } from "../repositories/training.repository";
import { paginate } from "../utils/pagination";
import { buildTrainingWhere } from "../utils/trainingWhereBuilder";

export const listTrainings = async (params: any) => {
  const where = buildTrainingWhere(params);

  const [trainings, totalCount] = await Promise.all([
    find({
      where,
      page: params.page,
      count: params.count,
      sortBy: params.sortBy,
      order: params.order,
    }),
    count(where),
  ]);

  const trainingsWithFavorites = trainings.map((training) => ({
    ...training,
    favorited: params.userId ? training.userTranings.length > 0 : false,
  }));

  return paginate(trainingsWithFavorites, totalCount, {
    page: params.page,
    pageSize: params.count,
    sortBy: params.sortBy,
    order: params.order,
  });
};
