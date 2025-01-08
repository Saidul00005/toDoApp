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
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and Password are required.")
        }
        try {
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

          return {
            id: user.user._id,
            name: user.user.name,
            email: user.user.userEmail,
            token: user.token,
            refreshToken: user.refreshToken,
          };
        } catch (error) {
          console.error("Authorization error:", error)
          throw new Error(error.message || "Failed to authenticate.")
        }
      },
    }),
  ],
  pages: {
    signIn: '/logIn'
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60  // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name
        token.email = user.email;
        token.token = user.token;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpiry = Date.now() + 55 * 60 * 1000; // Set expiry (55 minutes)
      }

      // Handle token expiration and refresh
      if (token.accessTokenExpiry && Date.now() > token.accessTokenExpiry - 5 * 60 * 1000) {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/refresh-token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: token.refreshToken }),
          });

          if (!res.ok) {
            throw new Error("Failed to refresh access token");
          }

          const data = await res.json();
          token.token = data.accessToken; // Update access token
          token.accessTokenExpiry = Date.now() + 55 * 60 * 1000; // Reset expiry
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
        name: token.name,
        email: token.email,
        token: token.token, // Include the latest access token
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/") || url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
