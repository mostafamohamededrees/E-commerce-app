import NextAuth, { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        let user;
        try {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
        } catch (error: any) {
          // If Prisma validation fails due to corrupted role, use raw query
          console.log(
            "Standard user query failed, trying raw aggregation...",
            error.message,
          );
          try {
            const users = await prisma.user.aggregateRaw({
              pipeline: [
                {
                  $match: { email: credentials.email },
                },
                {
                  $addFields: {
                    role: {
                      $cond: [
                        { $in: ["$role", ["USER", "ADMIN"]] },
                        "$role",
                        "USER",
                      ],
                    },
                  },
                },
              ],
            });

            if (Array.isArray(users) && users.length > 0) {
              user = users[0] as unknown as any;
            }
          } catch (fallbackError) {
            console.error("Fallback query also failed:", fallbackError);
            throw new Error("Invalid email or password");
          }
        }

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
