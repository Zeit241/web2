import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { UserSession } from "@/types/custom-types";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
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
        // const user = await SignIn({ username });
        const user = {
          id: 1,
          role: "user",
          username: "username",
          password: "password",
        };
        if (!user) return null;

        const isPassportValid = await bcrypt.compare(password, user.password!);
        if (!isPassportValid) return null;
        return {
          id: user.id,
          username: user.username,
          role: user.role,
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
