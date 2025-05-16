// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  console.log('going inside email.ts');
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Welcome to Capita Wave!</h2>
      <p style="font-size: 16px; color: #555;">
        Thank you for registering. Please verify your email address by clicking the button below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">
          Verify Email
        </a>
      </div>

      <p style="font-size: 14px; color: #777;">
        If the button doesn't work, copy and paste the following link into your browser:
      </p>
      <p style="word-break: break-all; font-size: 14px; color: #007bff;">
        <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
      </p>

      <p style="font-size: 14px; color: #999; margin-top: 40px;">
        — The Capita Wave Team
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Capita Wave" <${process.env.EMAIL_SERVER_USER}>`,
    to,
    subject: "Verify your email",
    html: htmlContent,
  });
}

