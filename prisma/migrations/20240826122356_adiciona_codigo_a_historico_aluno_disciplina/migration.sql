/*
  Warnings:

  - Added the required column `horario` to the `DisciplinaEmCurso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DisciplinaEmCurso" ADD COLUMN     "horario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HistoricoAlunoDisciplina" ADD COLUMN     "codigo" INTEGER;
