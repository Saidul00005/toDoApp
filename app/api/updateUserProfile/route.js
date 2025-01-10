import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the session is valid and the user is authenticated
    if (!session || !session.user.token) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { name, city, country, password } = await req.json(); // Parse the request body


    // Fetch the list of todos from your data source (e.g., database or external API)
    const response = await fetch(`${process.env.BACKEND_URL}/updateUserProfile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${session.user.token}`, // Add the JWT token here
      },
      body: JSON.stringify({ name, city, country, password }), // Send the updated profile data
    });

    if (!response.ok) {
      const errorData = await response.json(); // Assuming backend sends detailed error messages
      return NextResponse.json({ error: errorData.error || 'Failed to update user profile.' }, { status: response.status });
    }

    // Parse and return the profile data from the response
    const userProfile = await response.json();
    return NextResponse.json({ message: 'User profile updated successfully.', data: userProfile }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user profile.' }, { status: 500 });
  }
}
