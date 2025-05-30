import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import authOptions from "@/lib/authOptions";

const prisma = new PrismaClient();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };