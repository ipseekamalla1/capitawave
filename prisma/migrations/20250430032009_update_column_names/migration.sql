/*
  Warnings:

  - You are about to drop the column `externalAccountNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `externalBankName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `recipientUserId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `senderUserId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `SenderUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_recipientUserId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderUserId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "externalAccountNumber",
DROP COLUMN "externalBankName",
DROP COLUMN "recipientUserId",
DROP COLUMN "senderUserId",
ADD COLUMN     "ExternalAccountNumber" TEXT,
ADD COLUMN     "ExternalBankName" TEXT,
ADD COLUMN     "RecipientUserId" TEXT,
ADD COLUMN     "SenderUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_SenderUserId_fkey" FOREIGN KEY ("SenderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_RecipientUserId_fkey" FOREIGN KEY ("RecipientUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
