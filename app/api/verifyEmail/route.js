import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json({ error: "Token and Email are required." }, { status: 400 });
    }

    // Send a request to your Express backend email verification endpoint
    const res = await fetch(`${process.env.BACKEND_URL}/verify-email?token=${token}&email=${email}`)

    // Forward the response back to the frontend
    const responseJson = await res.json();

    if (!res.ok) {
      return NextResponse.json(responseJson, { status: res.status });
    }

    // Post the response to another page
    const postResponse = await fetch(`${process.env.NEXTAUTH_URL}/emailVerificationMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseJson),
    });

    if (!postResponse.ok) {
      const postResponseJson = await postResponse.json();
      return NextResponse.json(postResponseJson, { status: postResponse.status });
    }

    return NextResponse.json({ message: 'Email verified and response posted successfully' }, { status: 200 });

  } catch (err) {
    console.error("Error verifying email:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}