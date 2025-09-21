import { TrainingResponseDto } from "../dtos/training.dto";

export function toTrainingResponse(training: any, userId?: string): TrainingResponseDto {
    console.log(training);
    console.log(training.TraningExercises[0].exercise)
    console.log(training.TraningExercises[0].exercise.usedMuscles)

  return {
    id: training.id,
    title: training.title,
    description: training.description,
    duration: training.duration,
    isPublic: training.isPublic,
    thumbnailUrl: training.thumbnailUrl,
    goal: training.goal,
    experienceLevel: training.experienceLevel,
    createdAt: training.createdAt,
    updatedAt: training.updatedAt,

    exercises: training.TraningExercises.map((te: any) => ({
      id: te.exerciseId,
      name: te.exercise.name,
      sets: te.sets,
      reps: te.reps,
      instructions: te.exercise.ExerciseInstruction.map((i: {description: string }) => i.description),
    })),
    equipaments: Array.from(
        new Set(
            training.TraningExercises
            .map((te: any) => te.exercise.equipament?.name)
            .filter((name: string): name is string => Boolean(name))
        )
    ),
    muscles: Array.from(
        new Set(
            training.TraningExercises.flatMap((te: any) =>
            te.exercise.usedMuscles.map((um: any) => um.muscle.name)
            ).filter((name: string): name is string => Boolean(name))
        )
    ),
    favorited: userId ? training.favoritedByUsers.length > 0 : false,
  };
}
