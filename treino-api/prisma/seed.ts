import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
