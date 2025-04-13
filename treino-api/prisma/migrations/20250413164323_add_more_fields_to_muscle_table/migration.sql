/*
  Warnings:

  - Added the required column `insertion` to the `Muscle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motorAction` to the `Muscle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technicalName` to the `Muscle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('SYNERGIST', 'ANTAGONIST', 'STABILIZER');

-- AlterTable
ALTER TABLE "Muscle" ADD COLUMN     "insertion" TEXT NOT NULL,
ADD COLUMN     "motorAction" TEXT NOT NULL,
ADD COLUMN     "technicalName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MuscleRelation" (
    "id" SERIAL NOT NULL,
    "muscleId" INTEGER NOT NULL,
    "relatedMuscleId" INTEGER NOT NULL,
    "relationType" "RelationType" NOT NULL,

    CONSTRAINT "MuscleRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleRelation_muscleId_relatedMuscleId_relationType_key" ON "MuscleRelation"("muscleId", "relatedMuscleId", "relationType");

-- CreateIndex
CREATE INDEX "Muscle_name_technicalName_idx" ON "Muscle"("name", "technicalName");

-- AddForeignKey
ALTER TABLE "MuscleRelation" ADD CONSTRAINT "MuscleRelation_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MuscleRelation" ADD CONSTRAINT "MuscleRelation_relatedMuscleId_fkey" FOREIGN KEY ("relatedMuscleId") REFERENCES "Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
