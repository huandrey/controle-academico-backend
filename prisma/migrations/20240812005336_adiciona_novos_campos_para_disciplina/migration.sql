/*
  Warnings:

  - You are about to drop the column `endTime` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Discipline` table. All the data in the column will be lost.
  - Added the required column `creditos` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaFinal` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeFaltas` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeProvas` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "endTime",
DROP COLUMN "name",
DROP COLUMN "startTime",
ADD COLUMN     "creditos" INTEGER NOT NULL,
ADD COLUMN     "mediaFinal" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "quantidadeFaltas" INTEGER NOT NULL,
ADD COLUMN     "quantidadeProvas" INTEGER NOT NULL,
ADD COLUMN     "semestre" TEXT NOT NULL;
