import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const prisma = new PrismaClient();

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON body
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fname: true,
        lname: true,
        username: true,
        email: true,
        street: true,
        state: true,
        zip: true,
        city: true,
        country: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        password:true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    // Return token and user data
    return NextResponse.json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

