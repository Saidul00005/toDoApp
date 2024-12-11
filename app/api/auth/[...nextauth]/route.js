import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();
        // console.log(user)

        if (!res.ok) {
          throw new Error("Failed to log in: Invalid credentials or server error");
        }

        if (!user.token || !user.user) {
          throw new Error("Invalid response from backend: Missing user or token");
        }

        // If backend returns a user and a token, return user object
        if (res.ok && user.token && user.user) {
          return {
            id: user.user._id,
            email: user.user.userEmail,
            token: user.token,  // Store the token as part of the user object
          };
        }

        // If login fails, return null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",  // We are using JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("JWT callback - token:", token);
      if (user) {
        // console.log("JWT callback - user:", user);
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;  // Store the JWT token in the session token
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session callback - token:", token);
      session.user = token;  // Add the token data to session's user
      // console.log("Session callback - session:", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
