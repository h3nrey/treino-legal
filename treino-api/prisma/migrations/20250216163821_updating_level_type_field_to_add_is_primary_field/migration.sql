/*
  Warnings:

  - You are about to drop the column `levelType` on the `MusclesExercises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MusclesExercises" DROP COLUMN "levelType",
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false;
