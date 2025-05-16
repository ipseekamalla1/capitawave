import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { sendMail } from "@/lib/otp"; // Utility to send OTP emails

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    // 🔍 Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fname: true,
        lname: true,
        username: true,
        email: true,
        password: true,
        street: true,
        state: true,
        zip: true,
        city: true,
        country: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        emailVerified: true,
        otpCode: true,
        otpExpiresAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    if (!user.emailVerified) {
      return NextResponse.json({ message: "Please verify your email before logging in." }, { status: 403 });
    }

    // 🔐 Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    // 🔐 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // 💾 Save OTP to DB
    await prisma.user.update({
      where: { email },
      data: {
        otpCode: otp,
        otpExpiresAt: otpExpiresAt,
      },
    });

    // 📧 Send OTP to user's email
    await sendMail(email, "Your OTP Code", `Your OTP is: ${otp}. It expires in 5 minutes.`);

    // ✅ Respond
    return NextResponse.json({
      message: "OTP sent to your email. Please verify to complete login.",
      otpSent: true,
      email,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
