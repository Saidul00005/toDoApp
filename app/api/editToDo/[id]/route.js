import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const updatedToDo = await req.json();
    // console.log("Updated Items", updatedToDo)

    if (!updatedToDo.toDoName || !updatedToDo.toDoDescription || !updatedToDo.toDoACT || !updatedToDo.toDoStatus || !updatedToDo.toDoCreationDate || !updatedToDo.toDoEditionDate) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const response = await fetch(`http://localhost:3001/editToDo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedToDo),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to update.' }, { status: response.status });
    }

    const responseData = await response.json();


    return NextResponse.json({ message: 'To-Do updated successfully.', data: responseData }, { status: 200 });
  } catch (error) {
    console.error('Error updating To-Do:', error);
    return NextResponse.json({ error: 'Error.' }, { status: 500 });
  }
}
