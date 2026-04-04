"use client";

import { formatPrice } from "@/utils/FormatPrice";
import truncateText from "@/utils/TrunkateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  // Rating For Products
  const productRating =
    data.reviews && data.reviews.length > 0
      ? data.reviews.reduce(
          (acc: number, review: any) => acc + review.rating,
          0,
        ) / data.reviews.length
      : 0;

  // Get the image safely
  const imageUrl =
    data.images && data.images[0]?.image
      ? data.images[0].image
      : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==";

  // Rating For Products
  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col gap-1 items-center w-full  ">
        <div className="aspect-square overflow-hidden relative w-full ">
          <Image
            className="w-full h-full object-contain"
            src={imageUrl}
            alt={data.name}
            width={200}
            height={200}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>
          {data.reviews && data.reviews.length > 0 ? data.reviews.length : 0}{" "}
          reviews
        </div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
