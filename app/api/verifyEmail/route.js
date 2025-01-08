import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    if (!token || !email) {
      // Redirect with an error message to the verification page
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/emailVerificationMessage?error=Token and Email are required.`,
      );
    }

    // Send a request to your Express backend email verification endpoint
    const res = await fetch(`${process.env.BACKEND_URL}/verifyEmail?token=${token}&email=${email}`)

    // Forward the response back to the frontend
    const responseJson = await res.json();

    if (!res.ok) {
      // Redirect with the error from the backend to the verification page
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/emailVerificationMessage?error=${encodeURIComponent(
          responseJson.error || "Verification failed."
        )}`
      );
    }

    // Redirect with success message to the verification page
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/emailVerificationMessage?success=${encodeURIComponent(
        responseJson.message || "Email verified successfully."
      )}`
    );

  } catch (err) {
    console.error("Error verifying email:", err);
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/emailVerificationMessage?error=Internal server error.`
    );
  }
}