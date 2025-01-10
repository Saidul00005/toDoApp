import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { name, city, country, userEmail, password } = await req.json();

    // Validation for missing fields
    if (!name || !city || !country || !userEmail || !password) {
      return NextResponse.json(
        { error: "All necessary fields are required" },
        { status: 400 }
      );
    }

    // Generate verification token and link
    const verificationToken = uuidv4();
    const verificationLink = `${process.env.NEXTAUTH_URL}/api/verifyEmail?token=${verificationToken}&email=${userEmail}`;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Boolean(process.env.SMTP_SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: userEmail,
      subject: "Verify your email",
      html: `
        <p>Please verify your email by clicking on the link below:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // External API Request for user data persistence
    const body = { name, city, country, userEmail, password, verificationToken };

    const response = await fetch(`${process.env.BACKEND_URL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Error saving user data." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Sign-up successful. Please verify your email.",
    });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
