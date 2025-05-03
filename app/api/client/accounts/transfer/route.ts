import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const { fromAccountId, toAccountId, amount, note, userId } = await req.json();

    if (!fromAccountId || !toAccountId || !amount || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (fromAccountId === toAccountId) {
      return NextResponse.json({ error: '"From" and "To" accounts must be different' }, { status: 400 });
    }

    const amountFloat = parseFloat(amount);
    if (isNaN(amountFloat) || amountFloat <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 });
    }

    const [fromAccount, toAccount] = await Promise.all([
      prisma.account.findUnique({ where: { id: fromAccountId } }),
      prisma.account.findUnique({ where: { id: toAccountId } })
    ]);

    if (!fromAccount || !toAccount) {
      return NextResponse.json({ error: 'One or both accounts not found' }, { status: 404 });
    }

    if (fromAccount.balance < amountFloat) {
      return NextResponse.json({ error: 'Insufficient funds in the source account' }, { status: 400 });
    }

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Deduct from sender
      await tx.account.update({
        where: { id: fromAccountId },
        data: { balance: { decrement: amountFloat } }
      });

      // 2. Add to receiver
      await tx.account.update({
        where: { id: toAccountId },
        data: { balance: { increment: amountFloat } }
      });

      // 3. Record transaction (sender)
      const transaction = await tx.transaction.create({
        data: {
          amount: amountFloat,
          type: 'TRANSFER',
          status: 'COMPLETED',
          description: note || 'Internal Transfer',
          accountId: fromAccountId,
          senderUserId: userId,
          recipientUserId: toAccount.userId // internal transfer
        }
      });

      return transaction;
    });

    return NextResponse.json({ message: 'Transfer successful', transaction: result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
