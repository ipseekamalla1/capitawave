import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/email";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fname, lname, username, email, password,
      street, state, zip, city, country, phone,
    } = body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = randomBytes(32).toString("hex");

     await prisma.user.create({
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
        verificationToken,
        emailVerified: false,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "User created successfully. Please check your email to verify your account." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
