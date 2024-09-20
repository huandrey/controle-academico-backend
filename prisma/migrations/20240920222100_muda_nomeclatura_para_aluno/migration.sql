/*
  Warnings:

  - You are about to drop the `Discente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discente" DROP CONSTRAINT "Discente_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Discente" DROP CONSTRAINT "Discente_livroId_fkey";

-- DropForeignKey
ALTER TABLE "Discente" DROP CONSTRAINT "Discente_userId_fkey";

-- DropForeignKey
ALTER TABLE "DisciplinaEmCurso" DROP CONSTRAINT "DisciplinaEmCurso_discenteId_fkey";

-- DropForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" DROP CONSTRAINT "HistoricoAlunoDisciplina_discenteId_fkey";

-- DropTable
DROP TABLE "Discente";

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" VARCHAR(9) NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "livroId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_userId_key" ON "Aluno"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_livroId_key" ON "Aluno"("livroId");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "LivroEmprestadoBiblioteca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoAlunoDisciplina" ADD CONSTRAINT "HistoricoAlunoDisciplina_discenteId_fkey" FOREIGN KEY ("discenteId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplinaEmCurso" ADD CONSTRAINT "DisciplinaEmCurso_discenteId_fkey" FOREIGN KEY ("discenteId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
