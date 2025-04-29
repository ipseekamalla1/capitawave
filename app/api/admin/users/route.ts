import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

// POST: Add a new user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fname, lname, email, username, password, street, state, zip, city, country, phone, role } = body;

    const newUser = await prisma.user.create({
      data: {
        fname,
        lname,
        email,
        username,
        password, // ⚠️ Make sure to hash password in real apps!
        street,
        state,
        zip,
        city,
        country,
        phone,
        role,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}


