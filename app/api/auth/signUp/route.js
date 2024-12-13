import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userEmail, password } = await req.json();

    if (!userEmail || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const body = { userEmail, password };

    // External API request
    const response = await fetch(`${process.env.BACKEND_URL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Handle errors from the external API
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "Failed to create user." }, { status: response.status });
    }

    // Success response
    const responseData = await response.json();
    return NextResponse.json({ message: "User created successfully.", data: responseData }, { status: 201 });
  } catch (error) {
    console.error("Error in sign-up route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
