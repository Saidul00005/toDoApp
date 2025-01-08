import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the session is valid and the user is authenticated
    if (!session || !session.user.token) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Fetch the list of todos from your data source (e.g., database or external API)
    const response = await fetch(`${process.env.BACKEND_URL}/userProfile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${session.user.token}`, // Add the JWT token here
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch user profile.' }, { status: response.status });
    }

    // Parse and return the profile data from the response
    const userProfile = await response.json();
    console.log(userProfile)

    return NextResponse.json({ message: 'User profile fetched successfully.', data: userProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user profile.' }, { status: 500 });
  }
}
