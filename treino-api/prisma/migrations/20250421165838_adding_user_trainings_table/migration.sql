-- CreateTable
CREATE TABLE "userTranings" (
    "userId" TEXT NOT NULL,
    "trainingId" INTEGER NOT NULL,

    CONSTRAINT "userTranings_pkey" PRIMARY KEY ("userId","trainingId")
);

-- AddForeignKey
ALTER TABLE "userTranings" ADD CONSTRAINT "userTranings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTranings" ADD CONSTRAINT "userTranings_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
