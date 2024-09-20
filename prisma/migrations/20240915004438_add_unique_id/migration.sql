/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `DisciplinaEmCurso` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DisciplinaEmCurso_id_key" ON "DisciplinaEmCurso"("id");
