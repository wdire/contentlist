-- AlterTable
ALTER TABLE "List" ADD COLUMN     "copiedFromId" INTEGER;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_copiedFromId_fkey" FOREIGN KEY ("copiedFromId") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;
