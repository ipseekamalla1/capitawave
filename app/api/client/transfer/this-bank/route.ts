// app/api/transfer/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const {
      fromAccountId,
      amount,
      note,
      recipientUsername,
      recipientAccountNumber,
    } = await req.json();

    // Validate required fields
    if (
      !fromAccountId ||
      !amount ||
      !recipientUsername ||
      !recipientAccountNumber
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: 'Amount must be a positive number' }, { status: 400 });
    }

    // Get sender's account and user
    const senderAccount = await prisma.account.findUnique({
      where: { id: fromAccountId },
      include: { user: true },
    });

    if (!senderAccount) {
      return NextResponse.json({ error: 'Sender account not found' }, { status: 404 });
    }

    if (senderAccount.balance < parsedAmount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
    }

    // Get recipient's account and user
    const recipientUser = await prisma.user.findUnique({
      where: { username: recipientUsername },
      include: {
        accounts: {
          where: { accountNumber: recipientAccountNumber },
        },
      },
    });

    if (!recipientUser || recipientUser.accounts.length === 0) {
      return NextResponse.json({ error: 'Recipient not found or invalid account number' }, { status: 404 });
    }

    const recipientAccount = recipientUser.accounts[0];

    // Prevent transfer to same account
    if (recipientAccount.id === fromAccountId) {
      return NextResponse.json({ error: 'Cannot transfer to the same account' }, { status: 400 });
    }

    // Perform transfer within a transaction
    const transactionResult = await prisma.$transaction(async (tx) => {
      // Deduct from sender
      await tx.account.update({
        where: { id: fromAccountId },
        data: {
          balance: { decrement: parsedAmount },
        },
      });

      // Credit recipient
      await tx.account.update({
        where: { id: recipientAccount.id },
        data: {
          balance: { increment: parsedAmount },
        },
      });

      // Create transaction log
      const newTransaction = await tx.transaction.create({
        data: {
          amount: parsedAmount,
          type: 'TRANSFER',
          status: 'COMPLETED',
          description: note || 'Internal Transfer',
          accountId: fromAccountId,
          senderUserId: senderAccount.userId,
          recipientUserId: recipientUser.id,
          externalBankName: null,
          externalAccountNumber: recipientAccount.accountNumber,
        },
      });

      return newTransaction;
    });

    return NextResponse.json({ success: true, transaction: transactionResult }, { status: 200 });
  } catch (error) {
    console.error('Transfer error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
