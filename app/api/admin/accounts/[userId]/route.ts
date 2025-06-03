import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PUT: Update account by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const { accountNumber, accountType, balance, status } = await req.json();

    const updatedAccount = await prisma.account.update({
      where: { id: userId },
      data: { accountNumber, accountType, balance, status },
    });

    return NextResponse.json(updatedAccount, { status: 200 });
  } catch (error) {
    console.error('Failed to update account:', error);
    return NextResponse.json(
      { message: 'Failed to update account', error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Delete account by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const account = await prisma.account.findUnique({
      where: { id: userId },
    });

    if (!account) {
      return NextResponse.json({ message: 'Account not found' }, { status: 404 });
    }

    await prisma.account.delete({ where: { id: userId } });

    return NextResponse.json({ message: 'Account deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: String(error) },
      { status: 500 }
    );
  }
}
