/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Discente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT,
ALTER COLUMN "role" SET DEFAULT 'DISCENTE';

-- CreateIndex
CREATE UNIQUE INDEX "Discente_matricula_key" ON "Discente"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
