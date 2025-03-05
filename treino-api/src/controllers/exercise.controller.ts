import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExercises = async (_req: Request, res: Response) => {
  const equipament = typeof _req.query.equipament === 'string' ? _req.query.equipament : undefined
  const muscle = typeof _req.query.muscle === 'string' ? _req.query.muscle : undefined
  const search = typeof _req.query.search === 'string' ? _req.query.search : undefined
  const page = _req.query.page ?? 0;
  const count = _req.query.count ?? 10;
  console.log(_req.query);

  const totalCount = await prisma.exercise.count({
    where: {
      equipament: { is: { name: equipament } },
      usedMuscles: { some: { muscle: { name: muscle } } }
    }
  });

  console.log("Search")
  console.log(search);

  const exercises = await prisma.exercise.findMany({
    where: {
      equipament: { is: { name: equipament } },
      usedMuscles: { some: { muscle: { name: muscle } } },
      name: { contains: search }
    },
    skip: Number(page) * Number(count),
    take: Number(count),
    include: { usedMuscles: { include: { muscle: true } } },
  });

  // const exercises = await prisma.exercise.findMany({
  //   where: {
  //     name: {contains: "Puxada"}
  //   }
  // })
  // res.json({data: exercises})

  res.json({
    data: exercises,
    currentPage: page,
    totalCount: totalCount
  });
};


export const getExercise = async (req: Request, res: Response) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      usedMuscles: { include: { muscle: true } },
      ExerciseInstruction: true,
      ExerciseTips: true,
      experienceLevel: true,
      equipament: true,
      grip: true,
    },
  });

  if (!exercise) return res.status(404).json({ error: "Exercise not found" });

  const formattedExercise = {
    ...exercise,
    usedMuscles: exercise.usedMuscles.map((um) => ({
      ...um.muscle,
      isPrimary: um.isPrimary,
    })),
  };

  res.json(formattedExercise);
};

export const createExercise = async (req: Request, res: Response) => {
  const {
    name,
    description,
    tutorialUrl,
    thumbnailUrl,
    riskLevel,
    experienceLevelId,
    gripId,
    equipamentId,
    muscles,
    instructions,
    tips,
  } = req.body;

  console.log(tips);

  try {
    const newExercise = await prisma.exercise.create({
      data: {
        name,
        description,
        experienceLevelId,
        gripId,
        tutorialUrl,
        thumbnailUrl,
        riskLevel,
        equipamentId,
        usedMuscles: {
          create: muscles.map((m: { muscleId: number; isPrimary: string }) => ({
            muscle: { connect: { id: m.muscleId } },
            isPrimary: m.isPrimary,
          })),
        },
        ExerciseInstruction: {
          create: instructions.map(
            (i: { step: number; description: string }) => ({
              step: i.step,
              description: i.description,
            })
          ),
        },
        ExerciseTips: {
          create: tips.map((t: { description: string }) => ({
            description: t.description,
          })),
        },
      },
      include: { usedMuscles: { include: { muscle: true } } },
    });

    res.status(201).json(newExercise);
  } catch (error) {
    res.status(400).json({ error: "Error creating exercise" });
    console.log(error);
  }
};

export const updateExercise = async (req: Request, res: Response) => {
  const {
    name,
    description,
    experienceLevelId,
    gripId,
    tutorialUrl,
    thumbnailUrl,
    riskLevel,
  } = req.body;

  const muscles = req.body.muscles ?? null;
  const instructions = req.body.instructions ?? null;
  const tips = req.body.tips ?? null;
  console.log(req.params.id);

  try {
    const updateData: any = {
      name,
      description,
      experienceLevelId,
      gripId,
      tutorialUrl,
      thumbnailUrl,
      riskLevel,
      ...(muscles?.length && {
        usedMuscles: {
          deleteMany: {},
          create: muscles.map((m: { muscleId: number; isPrimary: string }) => ({
            muscle: { connect: { id: m.muscleId } },
            isPrimary: m.isPrimary,
          })),
        },
      }),
      ...(instructions?.length && {
        ExerciseInstruction: {
          deleteMany: {},
          create: instructions.map(
            (i: { step: number; description: string }) => ({
              step: i.step,
              description: i.description,
            })
          ),
        },
      }),
      ...(tips?.length && {
        ExerciseTips: {
          deleteMany: {},
          create: tips.map((t: { description: string }) => ({
            description: t.description,
          })),
        },
      }),
    };

    const updatedExercise = await prisma.exercise.update({
      where: { id: Number(req.params.id) },
      data: updateData,
      include: { usedMuscles: { include: { muscle: true } } },
    });

    res.json(updatedExercise);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Exercise not found" });
  }
};

export const deleteExercise = async (req: Request, res: Response) => {
  try {
    await prisma.musclesExercises.deleteMany({
      where: { exerciseId: Number(req.params.id) },
    });

    await prisma.exercise.delete({ where: { id: Number(req.params.id) } });

    res.json({ message: "Exercise deleted" });
  } catch (error) {
    res.status(404).json({ error: "Exercise not found" });
  }
};
