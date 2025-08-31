// dtos/exercise.dto.ts
import { z } from "zod";

export const GetExercisesSchema = z.object({
  equipament: z.string().optional(),
  muscle: z.string().optional(),
  search: z.string().optional(),

  // Pagination
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

  // Sorting
  sortBy: z.enum(["name", "createdAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc"),

  userId: z.string().optional(),
});

export type GetExercisesDto = z.infer<typeof GetExercisesSchema>;

export interface GetExerciseByIdDTO {
  id: number;
  userId?: string;
}

export const CreateExerciseSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string(),
  tutorialUrl: z.url().optional(),
  thumbnailUrl: z.url().optional(),
  riskLevel: z.string(),
  experienceLevelId: z.number().int().positive(),
  gripId: z.number().int().positive().optional(),
  equipamentId: z.number().int().positive(),
  muscles: z.array(
    z.object({
      muscleId: z.number().int().positive(),
      isPrimary: z.boolean(),
    })
  ),
  instructions: z.array(
    z.object({
      step: z.number().min(1),
      description: z.string().min(2).max(500),
    })
  ),
  tips: z.array(
    z.object({
      description: z.string().min(2).max(500),
    })
  ),
});

export type CreateExerciseDto = z.infer<typeof CreateExerciseSchema>;

export const UpdateExerciseSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().optional(),
  tutorialUrl: z.url().optional(),
  thumbnailUrl: z.url().optional(),
  riskLevel: z.string().optional(),
  experienceLevelId: z.number().int().positive().optional(),
  gripId: z.number().int().positive().optional(),
  equipamentId: z.number().int().positive().optional(),
  muscles: z
    .array(
      z.object({
        muscleId: z.number().int().positive(),
        isPrimary: z.boolean(),
      })
    )
    .optional(),
  instructions: z
    .array(
      z.object({
        step: z.number().min(1),
        description: z.string().min(2).max(500),
      })
    )
    .optional(),
  tips: z
    .array(
      z.object({
        description: z.string().min(2).max(500),
      })
    )
    .optional(),
});

export type UpdateExerciseDto = z.infer<typeof UpdateExerciseSchema>;
