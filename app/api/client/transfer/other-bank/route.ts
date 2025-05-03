import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const banks = await prisma.externalBankAccount.findMany({
      select: {
        id: true,
        externalBankName: true,
        externalAccountNumber: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { externalBankName: 'asc' },
    });

    return NextResponse.json(banks);
  } catch (error) {
    console.error('[GET /api/client/transfer/other-bank]', error);
    return NextResponse.json({ error: 'Failed to fetch external bank accounts' }, { status: 500 });
  }
}
