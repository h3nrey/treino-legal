/*
  Warnings:

  - Added the required column `antagonists` to the `Muscle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synergists` to the `Muscle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Muscle" ADD COLUMN     "antagonists" TEXT NOT NULL,
ADD COLUMN     "synergists" TEXT NOT NULL;
