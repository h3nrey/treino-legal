import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { readFileSync } from "fs";

async function seedMuscles() {
  await prisma.muscle.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "Muscle_id_seq" RESTART WITH 1`;

  const muscles = [
    "Bíceps",
    "Tríceps",
    "Peito",
    "Costas",
    "Ombros",
    "Quadríceps",
    "Isquiotibiais",
    "Panturrilhas",
    "Abdômen",
    "Trapézio",
    "Glúteos",
    "Lombar",
    "Adutores",
    "Abdutores",
    "Antebraço",
  ];

  for (const muscle of muscles) {
    await prisma.muscle.upsert({
      where: { name: muscle }, // Directly use the string here
      update: {}, // No update action needed
      create: { name: muscle }, // Creating a new entry with the name
    });
  }

  console.log("✅ Muscles table seeded successfully!");
}

async function seedGrips() {
  await prisma.grip.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "Grip_id_seq" RESTART WITH 1`;

  const grips = ["Supinada", "Pronada", "Neutra"];

  for (const grip of grips) {
    await prisma.grip.upsert({
      where: { name: grip },
      update: {},
      create: { name: grip },
    });
  }

  console.log("✅ Grips table seeded successfully!");
}

async function seedEquipaments() {
  await prisma.equipament.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "Equipament_id_seq" RESTART WITH 1`;

  const equipaments = [
    "Barra",
    "Barra W",
    "Halteres",
    "Máquina",
    "Smith",
    "Peso Corporal",
    "Polia",
  ];

  for (const equipament of equipaments) {
    await prisma.equipament.upsert({
      where: { name: equipament },
      update: {},
      create: { name: equipament },
    });
  }

  console.log("✅ Equipaments table seeded successfully!");
}

async function seedExperienceLevels() {
  await prisma.experienceLevel.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "ExperienceLevel_id_seq" RESTART WITH 1`;

  const experienceLevels = ["Iniciante", "Intermediário", "Avançado"];

  for (const experienceLevel of experienceLevels) {
    await prisma.experienceLevel.upsert({
      where: { name: experienceLevel },
      update: {},
      create: { name: experienceLevel },
    });
  }

  console.log("✅ Experience Levels table seeded successfully!");
}

async function seedExercises() {
  const data = JSON.parse(readFileSync("prisma/exercises.json", "utf-8"));

  await prisma.exerciseInstruction.deleteMany();
  await prisma.exerciseTips.deleteMany();
  await prisma.musclesExercises.deleteMany();
  await prisma.exercise.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE "Exercise_id_seq" RESTART WITH 1`;

  for (const exercise of data) {
    console.log(exercise.muscles);
    await prisma.exercise.create({
      data: {
        name: exercise.name,
        description: exercise.description,
        experienceLevelId: exercise.experienceLevelId,
        gripId: exercise.gripId,
        tutorialUrl: exercise.tutorialUrl,
        thumbnailUrl: exercise.thumbnailUrl,
        riskLevel: exercise.riskLevel,
        equipamentId: exercise.equipamentId,
        usedMuscles: {
          create: exercise.muscles.map(
            (m: { muscleId: number; isPrimary: string }) => ({
              muscle: { connect: { id: m.muscleId } },
              isPrimary: m.isPrimary,
            })
          ),
        },
        ExerciseInstruction: {
          create: exercise.instructions.map(
            (i: { step: number; description: string }) => ({
              step: i.step,
              description: i.description,
            })
          ),
        },
        ExerciseTips: {
          create: exercise.tips.map((t: { description: string }) => ({
            description: t.description,
          })),
        },
      },
    });
  }
}

async function main() {
  // seedMuscles();
  // seedGrips();
  // seedEquipaments();
  // seedExperienceLevels();
  seedExercises();
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
