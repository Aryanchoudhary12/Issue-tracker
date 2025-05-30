import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth"
import authOptions from "@/lib/authOptions";

const prisma = new PrismaClient();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };