import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {

    const session = await getServerSession(authOptions);

    // Check if the session is valid and the user is authenticated
    if (!session || !session.user.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { toDoName, toDoDescription, toDoACT, toDoStatus } = body;

    if (!toDoName || !toDoDescription || !toDoACT || !toDoStatus) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Send data to the backend API
    const response = await fetch(`${process.env.BACKEND_URL}/addToDo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.user.token}`, // Add the JWT token here
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Fetch detailed error message from the backend
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const responseData = await response.json();
    return NextResponse.json(
      { message: "To do item saved successfully.", data: responseData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
