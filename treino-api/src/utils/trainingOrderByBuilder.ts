import { GetTrainingsDto } from "../dtos/training.dto";

export const buildTrainingOrderBy = (params: GetTrainingsDto) => {
  let orderBy: any = {};

  const { sortBy, order } = params;

  if (sortBy === 'popularity') {
    orderBy = {
        favoritedByUsers: {
            _count: order
        }
    };
    } else {
    orderBy = {
        [sortBy]: order
    };
    }

    console.log(orderBy);
  return orderBy;
};
