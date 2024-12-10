import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const protectedPaths = ['/toDoList', '/addNewItem', '/history'];

  // Retrieve the token from cookies (used by NextAuth)
  const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

  // If user is not authenticated and accessing protected paths, redirect to login
  if (protectedPaths.includes(pathname) && !token) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url); // Redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // Allow requests to continue for authenticated users or other paths
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/toDoList', '/addNewItem', '/history'], // Only apply middleware to these routes
};
