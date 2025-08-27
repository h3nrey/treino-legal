import { z } from "zod";

export const PaginatedSchema = z.object({
  pagination: z
    .object({
      currentPage: z.number(),
      pageSize: z.number(),
      totalCount: z.number(),
      totalPages: z.number(),
    })
    .optional(),
  sort: z
    .object({
      sortBy: z.string(),
      order: z.enum(["asc", "desc"]),
    })
    .optional(),
});
