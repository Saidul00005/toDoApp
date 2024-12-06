import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        // Store the user's Google ID (sub) in the token
        token.userId = user.id; // 'user.id' is the unique ID from Google
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.userId; // Include user ID in the session object
      return session;
    },
  },
});

export { handler as GET, handler as POST };
