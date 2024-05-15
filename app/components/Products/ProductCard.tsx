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
    data.reviews.length > 0
      ? data.reviews.reduce(
          (acc: number, review: any) => acc + review.rating,
          0
        ) / data.reviews.length
      : 0;
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
            src={data.images[0].image}
            alt={data.name}
            fill
            objectFit="contain"
            sizes="100vw" // Add this line
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
