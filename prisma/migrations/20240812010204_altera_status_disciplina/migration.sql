/*
  Warnings:

  - The values [PAID,IN_PROGRESS,FAILED] on the enum `DisciplineStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DisciplineStatus_new" AS ENUM ('APENAS_MEDIA_APROVADO', 'APENAS_MEDIA_REPROVADO', 'REPROVADO_POR_FALTA', 'TRANCADA', 'EM_PROGRESSO');
ALTER TABLE "Discipline" ALTER COLUMN "status" TYPE "DisciplineStatus_new" USING ("status"::text::"DisciplineStatus_new");
ALTER TYPE "DisciplineStatus" RENAME TO "DisciplineStatus_old";
ALTER TYPE "DisciplineStatus_new" RENAME TO "DisciplineStatus";
DROP TYPE "DisciplineStatus_old";
COMMIT;
