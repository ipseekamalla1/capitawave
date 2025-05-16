import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.otpCode || !user.otpExpiresAt) {
      return NextResponse.json({ message: "OTP not found. Please request again." }, { status: 400 });
    }

    const now = new Date();
    if (user.otpCode !== otp || user.otpExpiresAt < now) {
      return NextResponse.json({ message: "Invalid or expired OTP." }, { status: 401 });
    }

    // OTP is valid — issue JWT and clear OTP fields
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

    await prisma.user.update({
      where: { email },
      data: { otpCode: null, otpExpiresAt: null },
    });

    return NextResponse.json({
      token,
      user,
      message: "OTP verified. Login successful!",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
