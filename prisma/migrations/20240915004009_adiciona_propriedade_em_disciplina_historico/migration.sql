/*
  Warnings:

  - Added the required column `nome` to the `HistoricoAlunoDisciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `HistoricoAlunoDisciplina` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoricoAlunoDisciplina" ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "status" "DisciplinaStatus" NOT NULL;
