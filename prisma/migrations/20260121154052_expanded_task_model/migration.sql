/*
  Warnings:

  - Added the required column `title` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "task" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_STARTED',
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
