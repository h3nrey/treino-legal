import { z } from "zod";

export const GetTrainingsSchema = z.object({
  equipament: z.string().optional(),
  muscle: z.string().optional(),
  goal: z.enum(["STRENGTH_GAIN", "CARDIO", "MUSCLE_GAIN", "WEIGHT_LOSS"]).optional(),
  search: z.string().optional(),

  page: z
    .string()
    .transform((val) => Number(val))
    .default(0)
    .pipe(z.number().min(0)),
  count: z
    .string()
    .transform((val) => Number(val))
    .default(10)
    .pipe(z.number().min(1).max(100)),

  sortBy: z.enum(["createdAt", "popularity"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),

  userId: z.string().optional(),
});

export const TrainingResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  isPublic: z.boolean(),
  thumbnailUrl: z.string().nullable().optional(),
  goal: z.enum(["STRENGTH_GAIN", "CARDIO", "MUSCLE_GAIN", "WEIGHT_LOSS"]),
  experienceLevel: z.enum(["BEGGINER", "INTERMEDIARY", "ADVANCED", "ATHLETE"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  exercises: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      instructions: z.array(z.string()),
    })
  ),
  equipaments: z.array(z.string()),
  muscles: z.array(z.string()),
  favorited: z.boolean(),
});

export type TrainingResponseDto = z.infer<typeof TrainingResponseSchema>;

export const CreateTrainingsSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  duration: z.number().min(1),
  isPublic: z.boolean().default(true),
  thumbnailUrl: z.url().optional(),
  goal: z.enum(["STRENGTH_GAIN", "CARDIO", "MUSCLE_GAIN", "WEIGHT_LOSS"]),
  experienceLevel: z.enum(["BEGGINER", "INTERMEDIARY", "ADVANCED", "ATHLETE"]),
  userId: z.uuid(),
  exercises: z.array(
    z.object({
      exerciseId: z.number().min(1),
      sets: z.number().default(1),
      reps: z.number().default(1),
    })
  ),
});


export type GetTrainingsDto = z.infer<typeof GetTrainingsSchema>;
export type CreateTrainingsDto = z.infer<typeof CreateTrainingsSchema>;
