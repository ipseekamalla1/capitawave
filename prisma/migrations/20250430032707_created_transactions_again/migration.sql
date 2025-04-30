/*
  Warnings:

  - You are about to drop the column `ExternalAccountNumber` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `ExternalBankName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `RecipientUserId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `SenderUserId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `senderUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_RecipientUserId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_SenderUserId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "ExternalAccountNumber",
DROP COLUMN "ExternalBankName",
DROP COLUMN "RecipientUserId",
DROP COLUMN "SenderUserId",
ADD COLUMN     "externalAccountNumber" TEXT,
ADD COLUMN     "externalBankName" TEXT,
ADD COLUMN     "recipientUserId" TEXT,
ADD COLUMN     "senderUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderUserId_fkey" FOREIGN KEY ("senderUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_recipientUserId_fkey" FOREIGN KEY ("recipientUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
