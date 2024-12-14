import { signOut } from "next-auth/react";

export const validateSession = (session, status) => {
  if (status !== "authenticated") {
    return false; // User is not authenticated
  }

  // Check if the session exists and is not expired
  if (!session || !session.expires || new Date(session.expires) <= new Date()) {
    signOut({ callbackUrl: "/" }); // Clear the session and redirect to login
    return false; // Session is invalid
  }

  return true; // Session is valid
};
