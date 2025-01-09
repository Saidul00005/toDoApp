import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the session is valid and the user is authenticated
    if (!session || !session.user.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the list of todos from your data source (e.g., database or external API)
    const response = await fetch(`${process.env.BACKEND_URL}/toDoList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${session.user.token}`, // Add the JWT token here
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch todos.' }, { status: response.status });
    }

    const todos = await response.json();

    return NextResponse.json({ message: 'Fetched successfully.', data: todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching todos.' }, { status: 500 });
  }
}
