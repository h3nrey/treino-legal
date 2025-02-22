import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listEquipaments = async (_req: Request, res: Response) => {
    const equipaments = await prisma.equipament.findMany();
    res.json(equipaments);
}