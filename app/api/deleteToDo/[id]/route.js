import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the session is valid and the user is authenticated
    if (!session || !session.user.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteToDo/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${session.user.token}`, // Add the JWT token here
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to delete To-Do.' }, { status: response.status });
    }

    return NextResponse.json({ message: 'To-Do deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting To-Do:', error);
    return NextResponse.json({ error: 'Error.' }, { status: 500 });
  }
}
