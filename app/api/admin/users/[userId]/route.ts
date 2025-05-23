import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Make sure you install it: npm install bcryptjs

const prisma = new PrismaClient();

interface Params {
  params: { userId: string };
}

// GET: Fetch a specific user
export async function GET(req: Request, { params }: Params) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Error fetching user" }, { status: 500 });
  }
}

// PUT: Update a specific user
export async function PUT(req: Request, { params }: Params) {
  const { userId } = params;

  try {
    const body = await req.json();
    const { fname, lname, email, username, password, street, state, zip, city, country, phone, role } = body;

    const updatedData: any = {
      fname,
      lname,
      email,
      username,
      street,
      state,
      zip,
      city,
      country,
      phone,
      role,
    };

    // Only hash password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); 
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}

// DELETE: Delete a specific user
export async function DELETE(req: Request, { params }: Params) {
  const { userId } = params;

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}
