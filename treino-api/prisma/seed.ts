import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { readFileSync } from "fs";

async function seedMuscles() {
  await prisma.muscle.deleteMany({});

  await prisma.$executeRaw`ALTER SEQUENCE "Muscle_id_seq" RESTART WITH 1`;

  // const muscles = [
  //   "Bíceps",
  //   "Tríceps",
  //   "Peito",
  //   "Costas",
  //   "Ombros",
  //   "Quadríceps",
  //   "Isquiotibiais",
  //   "Panturrilhas",
  //   "Abdômen",
  //   "Trapézio",
  //   "Glúteos",
  //   "Lombar",
  //   "Adutores",
  //   "Abdutores",
  //   "Antebraço",
  // ];

  const muscleData = [
    {
      name: "Bíceps",
      technicalName: "Bíceps Braquial",
      description:
        "Músculo de duas cabeças localizado na parte anterior do braço",
      motorAction: "Flexão do cotovelo e supinação do antebraço",
      insertion:
        "Tuberosidade do rádio e fáscia do antebraço via aponeurose bicipital",
      synergists: ["Braquial", "Braquiorradial"],
      antagonists: ["Tríceps Braquial"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/biceps-brachii-muscle-illustration.jpg",
    },
    {
      name: "Tríceps",
      technicalName: "Tríceps Braquial",
      description:
        "Músculo de três cabeças localizado na parte posterior do braço",
      motorAction: "Extensão do cotovelo",
      insertion: "Olecrano da ulna",
      synergists: ["Ancôneo"],
      antagonists: ["Bíceps Braquial"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/triceps-brachii-muscle-illustration.jpg",
    },
    {
      name: "Peito",
      technicalName: "Peitoral Maior",
      description:
        "Grande músculo em forma de leque que cobre a parte anterior do tórax",
      motorAction: "Adução, flexão e rotação medial do úmero",
      insertion: "Crista do tubérculo maior do úmero",
      synergists: ["Deltóide Anterior", "Tríceps Braquial (cabeça longa)"],
      antagonists: ["Trapézio", "Latíssimo do Dorso"],
      imageUrl:
        "https://www.kenhub.com/thumbor/zyJkUTwXv6Yw4j4o9QY9X9XJkFw=/1000x600/smart/filters:quality(80)/images/pectoralis-major-muscle.jpg",
    },
    {
      name: "Costas (Asas)",
      technicalName: "Latíssimo do Dorso",
      description:
        "Músculo largo e plano que cobre a região lombar e torácica inferior",
      motorAction: "Adução, extensão e rotação medial do úmero",
      insertion: "Assoalho do sulco intertubercular do úmero",
      synergists: ["Grande Redondo", "Peitoral Maior"],
      antagonists: ["Deltóide", "Trapézio"],
      imageUrl:
        "https://www.kenhub.com/thumbor/DX6ZQwQ9X9X9X9X9X9X9X9X9X9X=/1000x600/smart/filters:quality(80)/images/latissimus-dorsi-muscle.jpg",
    },
    {
      name: "Ombros (Deltóide)",
      technicalName: "Deltóide",
      description: "Músculo triangular que forma a curvatura do ombro",
      motorAction:
        "Abdução do braço (feixe médio), flexão (feixe anterior) e extensão (feixe posterior)",
      insertion: "Tubérculo deltoide do úmero",
      synergists: ["Supraespinhal", "Trapézio"],
      antagonists: ["Latíssimo do Dorso", "Grande Peitoral"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/deltoid-muscle-illustration.jpg",
    },
    {
      name: "Coxa (Quadríceps)",
      technicalName: "Quadríceps Femoral",
      description: "Grupo de quatro músculos na parte anterior da coxa",
      motorAction:
        "Extensão do joelho (todos), flexão do quadril (reto femoral)",
      insertion: "Tuberosidade da tíbia via ligamento patelar",
      synergists: ["Glúteo Máximo", "Isquiotibiais (para estabilização)"],
      antagonists: ["Isquiotibiais"],
      imageUrl:
        "https://www.kenhub.com/thumbor/zyJkUTwXv6Yw4j4o9QY9X9XJkFw=/1000x600/smart/filters:quality(80)/images/quadriceps-femoris-muscle.jpg",
    },
    {
      name: "Posterior de Coxa",
      technicalName: "Isquiotibiais",
      description:
        "Grupo de três músculos na parte posterior da coxa (Semimembranáceo, Semitendíneo e Bíceps Femoral)",
      motorAction: "Flexão do joelho e extensão do quadril",
      insertion: "Cabeça da fíbula e côndilo medial da tíbia",
      synergists: ["Glúteo Máximo", "Gastrocnêmio"],
      antagonists: ["Quadríceps Femoral"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/hamstrings-muscle-group-illustration.jpg",
    },
    {
      name: "Panturrilha",
      technicalName: "Tríceps Sural (Gastrocnêmio e Sóleo)",
      description:
        "Músculos da parte posterior da perna que formam a panturrilha",
      motorAction: "Flexão plantar do tornozelo",
      insertion: "Calcâneo via tendão de Aquiles",
      synergists: ["Tibial Posterior", "Fibular Longo"],
      antagonists: ["Tibial Anterior"],
      imageUrl:
        "https://www.kenhub.com/thumbor/zyJkUTwXv6Yw4j4o9QY9X9XJkFw=/1000x600/smart/filters:quality(80)/images/triceps-surae-muscle.jpg",
    },
    {
      name: "Abdômen",
      technicalName: "Reto Abdominal",
      description:
        "Músculo longo que se estende ao longo da parede abdominal anterior",
      motorAction: "Flexão da coluna vertebral, compressão abdominal",
      insertion: "Crista púbica e sínfise púbica",
      synergists: ["Oblíquos Externos", "Oblíquos Internos"],
      antagonists: ["Eretores da Espinha"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/rectus-abdominis-muscle-illustration.jpg",
    },
    {
      name: "Trapézio",
      technicalName: "Trapézio",
      description:
        "Músculo grande e superficial que cobre a parte posterior do pescoço e tronco superior",
      motorAction: "Elevação, retração e depressão da escápula",
      insertion: "Clavícula, acrômio e espinha da escápula",
      synergists: ["Levantador da Escápula", "Romboides"],
      antagonists: ["Peitoral Menor", "Serrátil Anterior"],
      imageUrl:
        "https://www.kenhub.com/thumbor/zyJkUTwXv6Yw4j4o9QY9X9XJkFw=/1000x600/smart/filters:quality(80)/images/trapezius-muscle.jpg",
    },
    {
      name: "Glúteos",
      technicalName: "Glúteo Máximo",
      description: "Músculo grande e volumoso que forma a nádega",
      motorAction: "Extensão e rotação lateral do quadril",
      insertion: "Tracto iliotibial e tuberosidade glútea do fêmur",
      synergists: ["Isquiotibiais", "Adutor Magno"],
      antagonists: ["Íliopsoas", "Reto Femoral"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/gluteus-maximus-muscle-illustration.jpg",
    },
    {
      name: "Lombar",
      technicalName: "Eretores da Espinha",
      description: "Grupo de músculos que correm ao longo da coluna vertebral",
      motorAction: "Extensão da coluna vertebral",
      insertion:
        "Ângulos das costelas, processos transversos e espinhosos das vértebras",
      synergists: ["Multífidos", "Quadrado Lombar"],
      antagonists: ["Reto Abdominal", "Oblíquos"],
      imageUrl:
        "https://www.kenhub.com/thumbor/zyJkUTwXv6Yw4j4o9QY9X9XJkFw=/1000x600/smart/filters:quality(80)/images/erector-spinae-muscle-group.jpg",
    },
    {
      name: "Adutores",
      technicalName: "Adutores (Magno, Longo e Curto)",
      description: "Grupo de músculos na parte medial da coxa",
      motorAction: "Adução do quadril",
      insertion: "Linha áspera do fêmur",
      synergists: ["Grátil", "Pectíneo"],
      antagonists: ["Glúteo Médio", "Glúteo Mínimo"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/adductor-muscle-group-illustration.jpg",
    },
    {
      name: "Abdutores",
      technicalName: "Glúteo Médio e Mínimo",
      description: "Músculos profundos localizados na face lateral do quadril",
      motorAction: "Abdução e rotação medial do quadril",
      insertion: "Trocânter maior do fêmur",
      synergists: ["Tensor da Fáscia Lata", "Sartório"],
      antagonists: ["Adutores"],
      imageUrl:
        "https://www.kenhub.com/thumbor/zyJkUTwXv6Yw4j4o9QY9X9XJkFw=/1000x600/smart/filters:quality(80)/images/gluteus-medius-minimus-muscles.jpg",
    },
    {
      name: "Antebraço",
      technicalName: "Braquiorradial e Flexores do Punho",
      description: "Grupo de músculos que cobrem o antebraço",
      motorAction:
        "Flexão do cotovelo (braquiorradial), flexão e extensão do punho",
      insertion: "Processo estilóide do rádio e bases dos metacarpais",
      synergists: ["Pronador Redondo", "Palmar Longo"],
      antagonists: ["Extensores do Punho"],
      imageUrl:
        "https://www.visiblebody.com/hubfs/learn/assets/images/muscular-system/forearm-flexors-muscle-group-illustration.jpg",
    },
  ];

  for (const muscle of muscleData) {
    await prisma.muscle.create({
      data: {
        name: muscle.name,
        technicalName: muscle.technicalName,
        description: muscle.description,
        motorAction: muscle.motorAction,
        insertion: muscle.insertion,
        synergists: muscle.synergists.join(", "),
        antagonists: muscle.antagonists.join(", "),
        imageUrl: muscle.imageUrl,
      },
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
  await prisma.userExercises.deleteMany();
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
  seedMuscles();
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
