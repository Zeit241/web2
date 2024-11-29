import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { UserSession } from "@/types/custom-types";
import conn from "./db";

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
        const query = 'SELECT id, username, password_hash FROM users WHERE username = $1';
        const result = await conn.query(query, [username]);

        if (result.rows.length === 0) {
          return null;
        }

        const user = result.rows[0];
        console.log(user)
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
        console.log(await bcrypt.hash(password, 10))
        if (!isPasswordMatch) {
          return null;
        }
        return {
          id: user.id,
          username: user.username,
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
