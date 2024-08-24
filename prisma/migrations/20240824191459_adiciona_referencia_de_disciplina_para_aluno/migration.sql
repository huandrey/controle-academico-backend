-- AlterTable
ALTER TABLE "Disciplina" ADD COLUMN     "discenteId" INTEGER;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_discenteId_fkey" FOREIGN KEY ("discenteId") REFERENCES "Discente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
