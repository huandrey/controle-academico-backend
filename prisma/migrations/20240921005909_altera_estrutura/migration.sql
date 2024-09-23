/*
  Warnings:

  - The values [DISCENTE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Curso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisciplinaEmCurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Docente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoricoAlunoDisciplina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Universidade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DisciplinaToDocente` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'Aluno', 'DOCENTE');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'Aluno';
COMMIT;

-- DropForeignKey
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_universidadeId_fkey";

-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplinaEmCurso" DROP CONSTRAINT "DisciplinaEmCurso_discenteId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplinaEmCurso" DROP CONSTRAINT "DisciplinaEmCurso_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplinaEmCurso" DROP CONSTRAINT "DisciplinaEmCurso_docenteId_fkey";

-- DropForeignKey
ALTER TABLE "Docente" DROP CONSTRAINT "Docente_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Docente" DROP CONSTRAINT "Docente_userId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" DROP CONSTRAINT "HistoricoAlunoDisciplina_discenteId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" DROP CONSTRAINT "HistoricoAlunoDisciplina_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" DROP CONSTRAINT "HistoricoAlunoDisciplina_docenteId_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplinaToDocente" DROP CONSTRAINT "_DisciplinaToDocente_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplinaToDocente" DROP CONSTRAINT "_DisciplinaToDocente_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'Aluno';

-- DropTable
DROP TABLE "Curso";

-- DropTable
DROP TABLE "DisciplinaEmCurso";

-- DropTable
DROP TABLE "Docente";

-- DropTable
DROP TABLE "HistoricoAlunoDisciplina";

-- DropTable
DROP TABLE "Universidade";

-- DropTable
DROP TABLE "_DisciplinaToDocente";

-- CreateTable
CREATE TABLE "MatriculaDisciplina" (
    "id" SERIAL NOT NULL,
    "matriculaDoEstudante" TEXT NOT NULL,
    "codigoDaDisciplina" INTEGER NOT NULL,
    "nomeDaDisciplina" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "turma" TEXT,
    "status" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "mediaFinal" DOUBLE PRECISION,
    "dispensas" TEXT,
    "alunoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatriculaDisciplina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatriculaDisciplina" ADD CONSTRAINT "MatriculaDisciplina_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
