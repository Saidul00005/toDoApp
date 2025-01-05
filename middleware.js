import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const protectedPaths = ['/toDoList', '/addNewItem', '/history'];

  // Paths that should not be accessible when logged in
  const authPaths = ['/logIn', '/signUp'];

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    // If user is not authenticated and accessing protected paths, redirect to login
    if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
      const loginUrl = new URL('/logIn', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url); // Redirect back after login
      return NextResponse.redirect(loginUrl);
    }

    if (authPaths.includes(pathname) && token) {
      return NextResponse.redirect(new URL('/toDoList', request.url));
    }

    // For API routes, ensure they're protected
    if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
      if (!token) {
        return new NextResponse(
          JSON.stringify({ error: 'Authentication required' }),
          {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    return NextResponse.next()

  } catch (error) {
    console.error('Middleware error:', error);
    // In case of any error, redirect to login for security
    return NextResponse.redirect(new URL('/logIn', request.url));
  }

}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/logIn', '/signUp', '/toDoList', '/addNewItem', '/history', '/api/:path'], // Include login and signup pages in the matcher
};