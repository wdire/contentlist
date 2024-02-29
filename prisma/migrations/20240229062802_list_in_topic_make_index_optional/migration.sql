/*
  Warnings:

  - You are about to drop the column `updated_At` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "List" RENAME COLUMN "updated_At" TO "updated_at";

-- AlterTable
ALTER TABLE "ListInTopic" ALTER COLUMN "index" DROP NOT NULL;
