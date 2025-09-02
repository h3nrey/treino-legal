/*
  Warnings:

  - You are about to drop the column `type` on the `Training` table. All the data in the column will be lost.
  - Added the required column `goal` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TrainingGoals" AS ENUM ('perder gordura', 'ganhar massa muscular', 'ganhar força', 'cardio');

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "type",
ADD COLUMN     "goal" "TrainingGoals" NOT NULL;

-- DropEnum
DROP TYPE "TrainingType";
