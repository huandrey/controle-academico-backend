/*
  Warnings:

  - Added the required column `status` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('PASSED', 'FAILED', 'WITHDRAWN');

-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "historyId" INTEGER;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "grade" DOUBLE PRECISION,
ADD COLUMN     "status" "EnrollmentStatus" NOT NULL;

-- AlterTable
CREATE SEQUENCE student_id_seq;
ALTER TABLE "Student" ALTER COLUMN "id" SET DEFAULT nextval('student_id_seq');
ALTER SEQUENCE student_id_seq OWNED BY "Student"."id";

-- AlterTable
CREATE SEQUENCE teacher_id_seq;
ALTER TABLE "Teacher" ALTER COLUMN "id" SET DEFAULT nextval('teacher_id_seq');
ALTER SEQUENCE teacher_id_seq OWNED BY "Teacher"."id";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
