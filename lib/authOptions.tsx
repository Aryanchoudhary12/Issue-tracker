import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth"
import Google from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
const prisma = new PrismaClient();
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    } ,
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string;
        }
      }
      return session;
    },
  },
};
export default authOptions
