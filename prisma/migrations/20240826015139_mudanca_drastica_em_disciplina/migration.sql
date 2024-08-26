/*
  Warnings:

  - You are about to drop the column `discenteId` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `docenteId` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `mediaFinal` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `quantidadeFaltas` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `quantidadeProvas` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `semestre` on the `Disciplina` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Disciplina` table. All the data in the column will be lost.
  - Added the required column `quantidadeFaltas` to the `DisciplinaEmCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeProvas` to the `DisciplinaEmCurso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre` to the `DisciplinaEmCurso` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `DisciplinaEmCurso` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `quantidadeFaltas` to the `HistoricoAlunoDisciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeProvas` to the `HistoricoAlunoDisciplina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestre` to the `HistoricoAlunoDisciplina` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_discenteId_fkey";

-- DropForeignKey
ALTER TABLE "Disciplina" DROP CONSTRAINT "Disciplina_docenteId_fkey";

-- AlterTable
ALTER TABLE "Disciplina" DROP COLUMN "discenteId",
DROP COLUMN "docenteId",
DROP COLUMN "mediaFinal",
DROP COLUMN "quantidadeFaltas",
DROP COLUMN "quantidadeProvas",
DROP COLUMN "semestre",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "DisciplinaEmCurso" ADD COLUMN     "mediaFinal" DOUBLE PRECISION,
ADD COLUMN     "quantidadeFaltas" INTEGER NOT NULL,
ADD COLUMN     "quantidadeProvas" INTEGER NOT NULL,
ADD COLUMN     "semestre" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "DisciplinaStatus" NOT NULL;

-- AlterTable
ALTER TABLE "HistoricoAlunoDisciplina" ADD COLUMN     "mediaFinal" DOUBLE PRECISION,
ADD COLUMN     "quantidadeFaltas" INTEGER NOT NULL,
ADD COLUMN     "quantidadeProvas" INTEGER NOT NULL,
ADD COLUMN     "semestre" TEXT NOT NULL;

-- DropEnum
DROP TYPE "DisciplinaEmCursoStatus";

-- CreateTable
CREATE TABLE "_DisciplinaToDocente" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplinaToDocente_AB_unique" ON "_DisciplinaToDocente"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplinaToDocente_B_index" ON "_DisciplinaToDocente"("B");

-- AddForeignKey
ALTER TABLE "_DisciplinaToDocente" ADD CONSTRAINT "_DisciplinaToDocente_A_fkey" FOREIGN KEY ("A") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplinaToDocente" ADD CONSTRAINT "_DisciplinaToDocente_B_fkey" FOREIGN KEY ("B") REFERENCES "Docente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
