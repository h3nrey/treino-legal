import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listEquipaments = async (_req: Request, res: Response) => {
    const { name } = _req.query;
    const equipaments = await prisma.equipament.findMany({
        where: name ? { name: name.toString() } : undefined
    });
    res.json(equipaments);
}