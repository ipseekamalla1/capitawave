import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accountNumber, balance, accountType, status, userId } = body;

    // Validate input
    if (!accountNumber || !userId) {
      return NextResponse.json({ message: "Account number and user ID are required." }, { status: 400 });
    }

    // Create a new account in the database
    const newAccount = await prisma.account.create({
      data: {
        accountNumber,
        balance: balance || 0,
        accountType,
        status,
        userId,
      },
    });

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
