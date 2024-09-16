/*
  Warnings:

  - The primary key for the `HistoricoAlunoDisciplina` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "HistoricoAlunoDisciplina" DROP CONSTRAINT "HistoricoAlunoDisciplina_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "HistoricoAlunoDisciplina_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "HistoricoAlunoDisciplina_id_seq";
