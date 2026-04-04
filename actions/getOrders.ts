import prisma from "@/libs/prismadb";

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    // If standard query fails due to corrupted data, try raw aggregation
    console.log(
      "Standard getOrders query failed, trying fallback...",
      error.message,
    );
    try {
      const orders = await prisma.order.aggregateRaw({
        pipeline: [
          {
            $lookup: {
              from: "User",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              "user.role": {
                $cond: [
                  { $in: ["$user.role", ["USER", "ADMIN"]] },
                  "$user.role",
                  "USER",
                ],
              },
            },
          },
          {
            $sort: { createDate: -1 },
          },
        ],
      });

      return orders as unknown as any[];
    } catch (fallbackError) {
      console.error("Fallback getOrders also failed:", fallbackError);
      throw new Error("Failed to fetch orders");
    }
  }
}
