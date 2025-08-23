-- DropForeignKey
ALTER TABLE "ExerciseInstruction" DROP CONSTRAINT "ExerciseInstruction_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseTips" DROP CONSTRAINT "ExerciseTips_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "MusclesExercises" DROP CONSTRAINT "MusclesExercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "MusclesExercises" DROP CONSTRAINT "MusclesExercises_muscleId_fkey";

-- DropForeignKey
ALTER TABLE "TraningExercises" DROP CONSTRAINT "TraningExercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "TraningExercises" DROP CONSTRAINT "TraningExercises_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "UserExercises" DROP CONSTRAINT "UserExercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "UserExercises" DROP CONSTRAINT "UserExercises_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserExercises" ADD CONSTRAINT "UserExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExercises" ADD CONSTRAINT "UserExercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInstruction" ADD CONSTRAINT "ExerciseInstruction_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseTips" ADD CONSTRAINT "ExerciseTips_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraningExercises" ADD CONSTRAINT "TraningExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TraningExercises" ADD CONSTRAINT "TraningExercises_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusclesExercises" ADD CONSTRAINT "MusclesExercises_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusclesExercises" ADD CONSTRAINT "MusclesExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
