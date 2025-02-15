/*
  Warnings:

  - You are about to drop the column `created_at` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `experience_level_id` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `grip_id` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `risk_level` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_id` on the `MusclesExercises` table. All the data in the column will be lost.
  - You are about to drop the column `level_type` on the `MusclesExercises` table. All the data in the column will be lost.
  - You are about to drop the column `muscle_id` on the `MusclesExercises` table. All the data in the column will be lost.
  - Added the required column `experienceLevelId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gripId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `riskLevel` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `MusclesExercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelType` to the `MusclesExercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleId` to the `MusclesExercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MusclesExercises" DROP CONSTRAINT "MusclesExercises_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "MusclesExercises" DROP CONSTRAINT "MusclesExercises_muscle_id_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "created_at",
DROP COLUMN "experience_level_id",
DROP COLUMN "grip_id",
DROP COLUMN "risk_level",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "experienceLevelId" INTEGER NOT NULL,
ADD COLUMN     "gripId" INTEGER NOT NULL,
ADD COLUMN     "riskLevel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MusclesExercises" DROP COLUMN "exercise_id",
DROP COLUMN "level_type",
DROP COLUMN "muscle_id",
ADD COLUMN     "exerciseId" INTEGER NOT NULL,
ADD COLUMN     "levelType" TEXT NOT NULL,
ADD COLUMN     "muscleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ExperienceLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExperienceLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Grip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExperienceLevel_name_key" ON "ExperienceLevel"("name");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_gripId_fkey" FOREIGN KEY ("gripId") REFERENCES "Grip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_experienceLevelId_fkey" FOREIGN KEY ("experienceLevelId") REFERENCES "ExperienceLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusclesExercises" ADD CONSTRAINT "MusclesExercises_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusclesExercises" ADD CONSTRAINT "MusclesExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
