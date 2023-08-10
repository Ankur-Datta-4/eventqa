/*
  Warnings:

  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_eventId_fkey";

-- DropTable
DROP TABLE "question";

-- CreateTable
CREATE TABLE "threads" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "downvote" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "threads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
