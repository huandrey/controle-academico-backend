/*
  Warnings:

  - Changed the type of `codigo_do_setor` on the `Aluno` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "codigo_do_setor",
ADD COLUMN     "codigo_do_setor" INTEGER NOT NULL;
