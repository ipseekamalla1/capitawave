import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";  // Import NextRequest and NextResponse

const prisma = new PrismaClient();

type SignupRequestBody = {
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  street: string;
  state: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

// Named export for POST method
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();  
    const {
      fname,
      lname,
      username,
      email,
      password,
      street,
      state,
      zip,
      city,
      country,
      phone,
    }: SignupRequestBody = body;

    // Check if password is empty
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    const newUser = await prisma.user.create({
      data: {
        fname,
        lname,
        username,
        email,
        password: hashedPassword,
        street,
        state,
        zip,
        city,
        country,
        phone,
      },
    });

    // Return success response
    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
