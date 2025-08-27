import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const find = async ({
  where,
  page,
  count,
  sortBy,
  order,
  userId,
}: {
  where: any;
  page: number;
  count: number;
  userId?: string;
  sortBy: string;
  order: "asc" | "desc";
}) => {
  return await prisma.training.findMany({
    take: count,
    skip: page * count,
    orderBy: { [sortBy]: order },
  });
};

export const count = async (where: any) => {
  const count = await prisma.training.count({
    where,
  });
  return count;
};
