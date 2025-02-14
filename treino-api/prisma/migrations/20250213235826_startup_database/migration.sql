-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experience_level_id" INTEGER NOT NULL,
    "grip_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tutorial_url" TEXT,
    "risk_level" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muscle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusclesExercises" (
    "id" SERIAL NOT NULL,
    "muscle_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "level_type" TEXT NOT NULL,

    CONSTRAINT "MusclesExercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MusclesExercises" ADD CONSTRAINT "MusclesExercises_muscle_id_fkey" FOREIGN KEY ("muscle_id") REFERENCES "Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusclesExercises" ADD CONSTRAINT "MusclesExercises_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
