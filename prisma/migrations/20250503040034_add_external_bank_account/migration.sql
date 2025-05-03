-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "externalBankAccountId" TEXT;

-- CreateTable
CREATE TABLE "ExternalBankAccount" (
    "id" TEXT NOT NULL,
    "externalBankName" TEXT NOT NULL,
    "externalAccountNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalBankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExternalBankAccount_externalAccountNumber_key" ON "ExternalBankAccount"("externalAccountNumber");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_externalBankAccountId_fkey" FOREIGN KEY ("externalBankAccountId") REFERENCES "ExternalBankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
