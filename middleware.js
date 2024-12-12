import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const protectedPaths = ['/toDoList', '/addNewItem', '/history'];

  // Paths that should not be accessible when logged in
  const authPaths = ['/logIn', '/signup'];

  // Retrieve the token from cookies (used by NextAuth)
  const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  // If user is not authenticated and accessing protected paths, redirect to login
  if (protectedPaths.includes(pathname) && !token) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url); // Redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and accessing auth paths, redirect to a protected page (e.g., /toDoList)
  if (authPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/toDoList', request.url));
  }

  // Allow requests to continue for authenticated users or other paths
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/logIn', '/signup', '/toDoList', '/addNewItem', '/history'], // Include login and signup pages in the matcher
};
