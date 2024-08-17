/*
  Warnings:

  - The values [STUDENT,TEACHER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nome` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DisciplinaStatus" AS ENUM ('APENAS_MEDIA_APROVADO', 'APENAS_MEDIA_REPROVADO', 'REPROVADO_POR_FALTA', 'TRANCADA');

-- CreateEnum
CREATE TYPE "DisciplinaEmCursoStatus" AS ENUM ('EM_PROGRESSO', 'TRANCADA');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'DISCENTE', 'DOCENTE');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_historyId_fkey";

-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nome" TEXT NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Discipline";

-- DropTable
DROP TABLE "Enrollment";

-- DropTable
DROP TABLE "History";

-- DropTable
DROP TABLE "Student";

-- DropTable
DROP TABLE "Teacher";

-- DropEnum
DROP TYPE "DisciplineStatus";

-- DropEnum
DROP TYPE "EnrollmentStatus";

-- CreateTable
CREATE TABLE "Universidade" (
    "id" SERIAL NOT NULL,
    "sigla" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Universidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "livroId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LivroEmprestadoBiblioteca" (
    "id" SERIAL NOT NULL,
    "nomeDoLivro" TEXT NOT NULL,
    "dataQueFoiPego" TEXT NOT NULL,
    "dataQuePrecisaSerEntregue" TEXT NOT NULL,
    "dataQueAlunoQuerSerLembrado" TEXT NOT NULL,
    "anotacoesSobreOLivro" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LivroEmprestadoBiblioteca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Docente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Docente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "universidadeId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "semestre" INTEGER NOT NULL,
    "quantidadeProvas" INTEGER NOT NULL,
    "quantidadeFaltas" INTEGER NOT NULL,
    "mediaFinal" DOUBLE PRECISION,
    "docenteId" INTEGER,
    "status" "DisciplinaStatus" NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoAlunoDisciplina" (
    "id" SERIAL NOT NULL,
    "discenteId" INTEGER NOT NULL,
    "docenteId" INTEGER,
    "disciplinaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricoAlunoDisciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplinaEmCurso" (
    "id" SERIAL NOT NULL,
    "discenteId" INTEGER NOT NULL,
    "docenteId" INTEGER,
    "disciplinaId" INTEGER NOT NULL,
    "notaDoDiscente" DOUBLE PRECISION,
    "status" "DisciplinaEmCursoStatus" NOT NULL,

    CONSTRAINT "DisciplinaEmCurso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discente_userId_key" ON "Discente"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Discente_livroId_key" ON "Discente"("livroId");

-- CreateIndex
CREATE UNIQUE INDEX "Docente_userId_key" ON "Docente"("userId");

-- AddForeignKey
ALTER TABLE "Discente" ADD CONSTRAINT "Discente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discente" ADD CONSTRAINT "Discente_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discente" ADD CONSTRAINT "Discente_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "LivroEmprestadoBiblioteca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Docente" ADD CONSTRAINT "Docente_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_universidadeId_fkey" FOREIGN KEY ("universidadeId") REFERENCES "Universidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" ADD CONSTRAINT "HistoricoAlunoDisciplina_discenteId_fkey" FOREIGN KEY ("discenteId") REFERENCES "Discente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" ADD CONSTRAINT "HistoricoAlunoDisciplina_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" ADD CONSTRAINT "HistoricoAlunoDisciplina_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplinaEmCurso" ADD CONSTRAINT "DisciplinaEmCurso_discenteId_fkey" FOREIGN KEY ("discenteId") REFERENCES "Discente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplinaEmCurso" ADD CONSTRAINT "DisciplinaEmCurso_docenteId_fkey" FOREIGN KEY ("docenteId") REFERENCES "Docente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplinaEmCurso" ADD CONSTRAINT "DisciplinaEmCurso_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
