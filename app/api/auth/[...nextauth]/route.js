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

        if (!res.ok) {
          throw new Error("Failed to log in: Invalid credentials or server error");
        }

        if (!user.token || !user.refreshToken || !user.user) {
          throw new Error("Invalid response from backend: Missing user, token, or refresh token");
        }


        if (res.ok && user.token && user.refreshToken && user.user) {
          return {
            id: user.user._id,
            email: user.user.userEmail,
            token: user.token,
            refreshToken: user.refreshToken,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiry = Date.now() + 60 * 60 * 1000; // Set expiry (1 hour)
      }

      // Handle token expiration and refresh
      if (Date.now() > token.accessTokenExpiry) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });

          if (!res.ok) {
            throw new Error("Failed to refresh access token");
          }

          const data = await res.json();
          token.token = data.accessToken; // Update access token
          token.accessTokenExpiry = Date.now() + 60 * 60 * 1000; // Reset expiry
        } catch (error) {
          console.error("Error refreshing access token:", error);
          return {}; // Keep old token; user will need to re-login if it's invalid
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        token: token.token, // Include the latest access token
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
