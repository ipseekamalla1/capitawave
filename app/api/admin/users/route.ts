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


export async function PUT(req: Request) {
  try {
    const { userId } = req.query;
    const body = await req.json();
    const { fname, lname, email, username, password, street, state, zip, city, country, phone, role } = body;

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        fname,
        lname,
        email,
        username,
        password, // ⚠️ Remember to hash the password
        street,
        state,
        zip,
        city,
        country,
        phone,
        role,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}