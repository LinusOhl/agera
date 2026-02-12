/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `team` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "team_ownerId_key" ON "team"("ownerId");

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
