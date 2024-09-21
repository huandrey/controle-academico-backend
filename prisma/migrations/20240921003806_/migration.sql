/*
  Warnings:

  - You are about to drop the column `cursoId` on the `Aluno` table. All the data in the column will be lost.
  - Added the required column `codigo_do_setor` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_do_campus` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_do_curso` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_do_setor` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turno_do_curso` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_cursoId_fkey";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "cursoId",
ADD COLUMN     "codigo_do_setor" TEXT NOT NULL,
ADD COLUMN     "nome_do_campus" TEXT NOT NULL,
ADD COLUMN     "nome_do_curso" TEXT NOT NULL,
ADD COLUMN     "nome_do_setor" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "turno_do_curso" TEXT NOT NULL;
