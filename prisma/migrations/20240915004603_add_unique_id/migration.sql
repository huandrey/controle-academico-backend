/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `HistoricoAlunoDisciplina` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HistoricoAlunoDisciplina_id_key" ON "HistoricoAlunoDisciplina"("id");
