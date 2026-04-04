import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    let currentUser;
    try {
      currentUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          orders: true,
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
              $match: { email: session.user.email },
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
          currentUser = users[0] as unknown as any;
        }
      } catch (fallbackError) {
        console.error("Fallback query also failed:", fallbackError);
        return null;
      }
    }

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt:
        currentUser.createdAt?.toISOString?.() || new Date().toISOString(),
      updateAt: currentUser.updateAt?.toISOString?.() || null,
      emailVerified: currentUser.emailVerified?.toISOString?.() || null,
    };
  } catch (error: any) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}
