import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Fetch the list of todos from your data source (e.g., database or external API)
    const response = await fetch('http://localhost:3001/toDoList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch todos.' }, { status: response.status });
    }

    const todos = await response.json();
    console.log(todos)

    return NextResponse.json({ message: 'Fetched successfully.', data: todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching todos.' }, { status: 500 });
  }
}
