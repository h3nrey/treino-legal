/*
  Warnings:

  - You are about to drop the column `thumbnail_url` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `tutorial_url` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "thumbnail_url",
DROP COLUMN "tutorial_url",
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "tutorialUrl" TEXT;
