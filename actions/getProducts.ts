import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { category, searchTerm } = params;

    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    const query: any = {};
    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    console.log(
      "Standard getProducts failed, trying fallback...",
      error.message,
    );
    try {
      // Try raw aggregation to get products with reviews without strict type validation
      const products = await prisma.product.aggregateRaw({
        pipeline: [
          ...(params.category
            ? [{ $match: { category: params.category } }]
            : []),
          {
            $lookup: {
              from: "Review",
              localField: "_id",
              foreignField: "productId",
              as: "reviews",
            },
          },
          {
            $addFields: {
              reviews: {
                $map: {
                  input: "$reviews",
                  as: "review",
                  in: {
                    ...("$$review" as any),
                    user: {
                      ...(("$$review.user" as any) || {}),
                      role: {
                        $cond: [
                          { $in: ["$$review.user.role", ["USER", "ADMIN"]] },
                          "$$review.user.role",
                          "USER",
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
          {
            $sort: { "reviews.createDate": -1 },
          },
        ],
      });

      return products as unknown as any[];
    } catch (fallbackError) {
      console.error("Fallback getProducts also failed:", fallbackError);
      return [];
    }
  }
}
