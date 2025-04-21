/*
  Warnings:

  - You are about to drop the `userTranings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userTranings" DROP CONSTRAINT "userTranings_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "userTranings" DROP CONSTRAINT "userTranings_userId_fkey";

-- DropTable
DROP TABLE "userTranings";

-- CreateTable
CREATE TABLE "UserTranings" (
    "userId" TEXT NOT NULL,
    "trainingId" INTEGER NOT NULL,

    CONSTRAINT "UserTranings_pkey" PRIMARY KEY ("userId","trainingId")
);

-- AddForeignKey
ALTER TABLE "UserTranings" ADD CONSTRAINT "UserTranings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTranings" ADD CONSTRAINT "UserTranings_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
