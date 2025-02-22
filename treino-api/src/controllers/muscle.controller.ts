import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listMuscles = async (_req: Request, res: Response) => {
    const muscles = await prisma.muscle.findMany();
    res.json(muscles);
}