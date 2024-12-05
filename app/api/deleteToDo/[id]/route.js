import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
    }

    const response = await fetch(`http://localhost:3001/deleteToDo/${id}`, {
      method: 'DELETE',
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
