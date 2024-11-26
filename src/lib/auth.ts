import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { UserSession } from "@/types/custom-types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      id: "credentials",
      type: "credentials",
      name: "credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const users = [
          { id: 1, username: "user", password: "pass" },
          { id: 2, username: "user2", password: "pass2" }
        ]
        const user = users.filter(e => e.username === username && e.password === password)
        console.log(user)
        if (!user[0]) return null;

        // const isPassportValid = await bcrypt.compare(password, user.password!);
        // if (!isPassportValid) return null;
        return {
          id: user[0].id,
          username: user[0].username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    jwt: async ({ token, user }) => {
      user ? (token.user = <UserSession>user) : null;
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...token.user,
          username: token.user?.username || token.user?.name || "John Doe",
        };
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "production",
  secret: process.env.NEXTAUTH_SECRET || "1111111",
  pages: {
    signIn: "/login",
  },
};
