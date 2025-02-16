-- CreateTable
CREATE TABLE "ExerciseInstruction" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "step" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "ExerciseInstruction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseInstruction" ADD CONSTRAINT "ExerciseInstruction_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
