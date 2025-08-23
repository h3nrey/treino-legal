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
    .default("0")
    .pipe(z.number().min(0)),
  count: z
    .string()
    .transform((val) => Number(val))
    .default("10")
    .pipe(z.number().min(1).max(100)),

  // Sorting
  sortBy: z.enum(["name", "createdAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("asc"),

  userId: z.string().optional(),
});

export type GetExercisesDto = z.infer<typeof GetExercisesSchema>;
