// app/api/users/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all users from the database
export async function GET() {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    return NextResponse.json(users); 
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

