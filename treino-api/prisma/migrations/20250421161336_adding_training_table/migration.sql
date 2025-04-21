-- CreateEnum
CREATE TYPE "TrainingType" AS ENUM ('HIPERTROPHY', 'RESITANCE', 'CARDIO', 'STREGTH');

-- CreateEnum
CREATE TYPE "ExperienceLevelEnum" AS ENUM ('BEGGINER', 'INTERMEDIARY', 'ADVANCED', 'ATHLETE');

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TrainingType" NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "experienceLevel" "ExperienceLevelEnum" NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TraningExercises" (
    "exerciseId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,

    CONSTRAINT "TraningExercises_pkey" PRIMARY KEY ("exerciseId","trainingId")
);

-- AddForeignKey
ALTER TABLE "TraningExercises" ADD CONSTRAINT "TraningExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraningExercises" ADD CONSTRAINT "TraningExercises_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
