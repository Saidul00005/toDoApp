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

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('q')

    if (!searchQuery) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Fetch the list of todos from your data source (e.g., database or external API)
    const response = await fetch(`${process.env.BACKEND_URL}/search?q=${encodeURIComponent(searchQuery)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${session.user.token}`, // Add the JWT token here
      },
    });


    if (!response.ok) {
      return NextResponse.json(
        { error: 'Search failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { message: 'Search successful', data: data },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Error performing search.' },
      { status: 500 }
    );
  }
}