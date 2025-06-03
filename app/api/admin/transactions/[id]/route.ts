import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getTransactionId(req: NextRequest): string | null {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  return segments.pop() || segments.pop() || null; // Handles trailing slash
}

// GET /api/admin/transactions/[id]
export async function GET(req: NextRequest) {
  const id = getTransactionId(req);

  if (!id) {
    return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
  }

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        senderUser: true,
        recipientUser: true,
      },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/admin/transactions/[id]
export async function DELETE(req: NextRequest) {
  const id = getTransactionId(req);

  if (!id) {
    return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
  }

  try {
    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}

// PATCH /api/admin/transactions/[id]
export async function PATCH(req: NextRequest) {
  const id = getTransactionId(req);

  if (!id) {
    return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
  }

  try {
    const { status } = await req.json();

    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}
