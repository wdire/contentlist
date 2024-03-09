/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `List` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cloudinaryImageId]` on the table `List` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ListInTopic" DROP CONSTRAINT "ListInTopic_listId_fkey";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "imageUrl",
ADD COLUMN     "cloudinaryImageId" TEXT;

-- CreateTable
CREATE TABLE "CloudinaryImage" (
    "id" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "version" TEXT NOT NULL,

    CONSTRAINT "CloudinaryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CloudinaryImage_publicId_key" ON "CloudinaryImage"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "List_cloudinaryImageId_key" ON "List"("cloudinaryImageId");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_cloudinaryImageId_fkey" FOREIGN KEY ("cloudinaryImageId") REFERENCES "CloudinaryImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListInTopic" ADD CONSTRAINT "ListInTopic_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;
