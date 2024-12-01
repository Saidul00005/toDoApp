import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const body = await req.json();

    if (!body.toDoName || !body.toDoDescription || !body.toDoACT || !body.toDoStatus) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // console.log('Received data:', body);

    const response = await fetch('http://localhost:3001/addToDo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to save.' }, { status: response.status })
    }

    const responseData = await response.json();
    return NextResponse.json({ message: 'To do item saved successfully.', data: responseData }, { status: 201 })


  } catch (error) {
    return NextResponse.json({ error: 'Error.' }, { status: 500 });
  }
}