/*
  Warnings:

  - The primary key for the `ExerciseInstruction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ExerciseInstruction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExerciseInstruction" DROP CONSTRAINT "ExerciseInstruction_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ExerciseInstruction_pkey" PRIMARY KEY ("exerciseId", "step");
