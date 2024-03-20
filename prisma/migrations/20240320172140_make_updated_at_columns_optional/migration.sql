-- AlterTable
ALTER TABLE "CloudinaryImage" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "List" ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updated_at" DROP NOT NULL;
