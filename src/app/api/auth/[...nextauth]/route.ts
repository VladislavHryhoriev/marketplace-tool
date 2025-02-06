import { users } from "@/users";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        authToken: { label: "Token", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.authToken) throw new Error("Token is required");

        const token = users.find((u) => u.authToken === credentials.authToken);
        if (!token) throw new Error("Token not found");

        return { id: token.id, name: token.name };
      },
    }),
  ],
  pages: { signIn: "/auth" },
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
