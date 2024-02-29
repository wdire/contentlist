/*
  Warnings:

  - You are about to drop the column `listOnHomepage` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "List" DROP COLUMN "listOnHomepage",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListInTopic" (
    "listId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "ListInTopic_pkey" PRIMARY KEY ("topicId","listId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_id_key" ON "Topic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE INDEX "idx_listInTopic_listId" ON "ListInTopic"("listId");

-- CreateIndex
CREATE INDEX "idx_listInTopic_topicId" ON "ListInTopic"("topicId");

-- CreateIndex
CREATE UNIQUE INDEX "ListInTopic_topicId_index_key" ON "ListInTopic"("topicId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "ListInTopic_topicId_listId_key" ON "ListInTopic"("topicId", "listId");

-- CreateIndex
CREATE INDEX "idx_list_userId" ON "List"("userId");

-- CreateIndex
CREATE INDEX "idx_user_username" ON "User"("username");

-- AddForeignKey
ALTER TABLE "ListInTopic" ADD CONSTRAINT "ListInTopic_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListInTopic" ADD CONSTRAINT "ListInTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
