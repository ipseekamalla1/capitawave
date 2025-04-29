// app/api/accounts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch all accounts with user names
export async function GET(req: NextRequest) {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        user: {
          select: {
            fname: true,
            lname: true,
          },
        },
      },
    });

    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Create a new account
export async function POST(req: NextRequest) {
  try {
    const { accountNumber, accountType, balance, status, userId } = await req.json();

    const newAccount = await prisma.account.create({
      data: {
        accountNumber,
        accountType,
        balance,
        status,
        userId,
      },
      include: {
        user: {
          select: {
            fname: true,
            lname: true,
          },
        },
      },
    });

    return NextResponse.json(newAccount, { status: 201 }); // Return the new account including the user details
  } catch (error) {
    console.error('Error creating account:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
