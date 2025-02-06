// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { authToken } = await req.json();
//     cookies().set("auth-token", authToken, {
//       httpOnly: true,
//       maxAge: 31 * 24 * 60 * 60 * 1000,
//     });

//     console.log(cookies().get("auth-token"));

//     return NextResponse.json({ ok: true }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ ok: false, message: error }, { status: 500 });
//   }
// }
import { users } from "@/users";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
