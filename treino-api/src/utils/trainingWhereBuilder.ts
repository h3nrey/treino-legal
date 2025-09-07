import { GetExercisesDto } from "../dtos/exercise.dto";
import { GetTrainingsDto } from "../dtos/training.dto";

export const buildTrainingWhere = (params: GetTrainingsDto) => {
  const where: any = {};

  if (params.goal) {
    where.goal = { in: [params.goal ]};
  }

  if(params.equipament) {
    where.TraningExercises = {
      some: {
        exercise: {
          equipament: {
            name: {
              contains: params.equipament,
              mode: 'insensitive',
            }
          }
        }
      }
    }
  }

  if(params.muscle) {
    where.TraningExercises = {
      some: {
        exercise: {
          usedMuscles: {
            some: {
              muscle: {
                name: {
                  contains: params.muscle,
                  mode: 'insensitive',
                },
              }
            }
          }
        }
      }
    }
  }

  return where;
};
