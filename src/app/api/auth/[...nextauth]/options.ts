import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { env } from "@/lib/env";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

export default authOptions;
