import prisma from "@/libs/prismadb";
import { fixCorruptedRoles } from "@/libs/fixCorruptedRoles";

export default async function getUsers() {
  try {
    // First, try to fix any corrupted role values
    await fixCorruptedRoles();
  } catch (error) {
    console.error("Warning: Could not fix corrupted roles:", error);
  }

  try {
    // Try to fetch users after fixing corrupted data
    const users = await prisma.user.findMany();
    return users;
  } catch (error: any) {
    // If still fails, use aggregation to bypass Prisma validation during fetch
    try {
      console.log(
        "Falling back to aggregation pipeline due to:",
        error.message,
      );
      const rawUsers = await prisma.user.aggregateRaw({
        pipeline: [
          {
            $addFields: {
              role: {
                $cond: [{ $in: ["$role", ["USER", "ADMIN"]] }, "$role", "USER"],
              },
            },
          },
        ],
      });

      // Cast the result to array
      const users = rawUsers as unknown as any[];
      return users;
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }
}
