-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('individual', 'team');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'individual';
