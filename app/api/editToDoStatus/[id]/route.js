import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    // Check if the session is valid and the user is authenticated
    if (!session || !session.user.token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { toDoStatus, toDoEditionDate } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    if (!toDoStatus) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const response = await fetch(`${process.env.BACKEND_URL}/editToDoStatus/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${session.user.token}`, // Add the JWT token here
      },
      body: JSON.stringify({ toDoStatus, toDoEditionDate }),
    });


    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to update status.' }, { status: response.status });
    }

    const responseData = await response.json();

    return NextResponse.json({ message: 'To-Do status updated successfully.', data: responseData }, { status: 200 });
  } catch (error) {
    console.error('Error updating To-Do status:', error);
    return NextResponse.json({ error: 'Error.' }, { status: 500 });
  }
}
