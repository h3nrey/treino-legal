import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listMuscles = async (_req: Request, res: Response) => {
    const muscles = await prisma.muscle.findMany();
    res.json(muscles);
}
export const getMuscle = async (_req: Request, res: Response) => {
    console.log(_req.params.musclename)
    const muscles = await prisma.muscle.findUnique({
        where: { name: _req.params.musclename }
    });
    res.json(muscles);
}