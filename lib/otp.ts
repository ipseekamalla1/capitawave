import nodemailer from "nodemailer";

export const sendMail = async (to: string, subject: string, text: string) => {
 const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_SERVER_HOST,
   port: Number(process.env.EMAIL_SERVER_PORT),
   auth: {
     user: process.env.EMAIL_SERVER_USER,
     pass: process.env.EMAIL_SERVER_PASSWORD,
   },
 });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
