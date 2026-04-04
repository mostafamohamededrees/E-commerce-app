import prisma from "./prismadb";

export async function fixCorruptedRoles() {
  try {
    // Use Prisma's runCommandRaw to execute MongoDB command directly
    const result = await prisma.$runCommandRaw({
      update: "User",
      updates: [
        {
          q: {
            role: { $nin: ["USER", "ADMIN"] },
          },
          u: { $set: { role: "USER" } },
          multi: true,
        },
      ],
    });

    console.log("Fixed corrupted user roles:", result);
    return result;
  } catch (error) {
    console.error("Error fixing corrupted roles:", error);
    // Don't throw - just log and continue
    return null;
  }
}
