/*
  Warnings:

  - Added the required column `equipamentId` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_gripId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "equipamentId" INTEGER NOT NULL,
ALTER COLUMN "gripId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Equipament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Equipament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_gripId_fkey" FOREIGN KEY ("gripId") REFERENCES "Grip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "Equipament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
