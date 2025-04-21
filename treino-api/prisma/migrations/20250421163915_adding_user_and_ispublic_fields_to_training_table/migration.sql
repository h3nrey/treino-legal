/*
  Warnings:

  - Added the required column `isPublic` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "isPublic" BOOLEAN NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
