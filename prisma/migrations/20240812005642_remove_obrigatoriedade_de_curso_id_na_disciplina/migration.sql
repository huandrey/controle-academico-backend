-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_courseId_fkey";

-- AlterTable
ALTER TABLE "Discipline" ALTER COLUMN "courseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
