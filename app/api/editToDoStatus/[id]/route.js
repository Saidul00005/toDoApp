import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { toDoStatus, toDoEditionDate } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    if (!toDoStatus) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const response = await fetch(`http://localhost:3001/editToDoStatus/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
