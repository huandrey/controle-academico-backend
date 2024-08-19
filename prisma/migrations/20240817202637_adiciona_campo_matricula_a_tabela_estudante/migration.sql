/*
  Warnings:

  - Added the required column `matricula` to the `Discente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discente" ADD COLUMN     "matricula" VARCHAR(6) NOT NULL;
