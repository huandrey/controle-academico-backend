/*
  Warnings:

  - The values [DISCENTE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cursoId` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `discenteId` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `docenteId` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the `Curso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisciplinaEmCurso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Docente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoricoAlunoDisciplina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LivroEmprestadoBiblioteca` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `codigo` to the `Disciplina` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SituacaoDisciplina" AS ENUM ('APROVADO', 'EM_PROGRESSO', 'TRANCADA', 'REPROVADO', 'DISPENSA', 'REPROVADO_POR_FALTA');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'ALUNO', 'DOCENTE');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ALUNO';
COMMIT;

-- DropForeignKey
ALTER TABLE "Curso" DROP CONSTRAINT "Curso_universidadeId_fkey";

-- DropForeignKey
ALTER TABLE "Discente" DROP CONSTRAINT "Discente_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Discente" DROP CONSTRAINT "Discente_livroId_fkey";

-- DropForeignKey
ALTER TABLE "Discente" DROP CONSTRAINT "Discente_userId_fkey";

-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_discenteId_fkey";

-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_docenteId_fkey";

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

-- AlterTable
ALTER TABLE "Disciplina" DROP COLUMN "cursoId",
DROP COLUMN "discenteId",
DROP COLUMN "docenteId",
DROP COLUMN "status",
ADD COLUMN     "alunoId" INTEGER,
ADD COLUMN     "cargaHoraria" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "docente" TEXT NOT NULL DEFAULT 'Desconhecido',
ADD COLUMN     "situacao" "SituacaoDisciplina" DEFAULT 'EM_PROGRESSO',
DROP COLUMN "codigo",
ADD COLUMN     "codigo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "role" SET DEFAULT 'ALUNO';

-- DropTable
DROP TABLE "Curso";

-- DropTable
DROP TABLE "Discente";

-- DropTable
DROP TABLE "DisciplinaEmCurso";

-- DropTable
DROP TABLE "Docente";

-- DropTable
DROP TABLE "HistoricoAlunoDisciplina";

-- DropTable
DROP TABLE "LivroEmprestadoBiblioteca";

-- DropEnum
DROP TYPE "DisciplinaEmCursoStatus";

-- DropEnum
DROP TYPE "DisciplinaStatus";

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" VARCHAR(9) NOT NULL,
    "curso" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_userId_key" ON "Aluno"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE SET NULL ON UPDATE CASCADE;
