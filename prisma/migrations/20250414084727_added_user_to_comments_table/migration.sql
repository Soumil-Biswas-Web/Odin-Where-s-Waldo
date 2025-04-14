/*
  Warnings:

  - Added the required column `userId` to the `ob_Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ob_Comment" ADD COLUMN     "userId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "ob_Comment" ADD CONSTRAINT "ob_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ob_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
