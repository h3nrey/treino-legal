-- CreateTable
CREATE TABLE "ExerciseTips" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ExerciseTips_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseTips" ADD CONSTRAINT "ExerciseTips_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
