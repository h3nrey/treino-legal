/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Equipament` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Grip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipament_name_key" ON "Equipament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Grip_name_key" ON "Grip"("name");
