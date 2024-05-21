"use client";

import { formatPrice } from "@/utils/FormatPrice";
import truncateText from "@/utils/TrunkateText";
import { CartProductType } from "@prisma/client";
import Image from "next/legacy/image";

interface OrderItemProps {
  item: CartProductType;
}
const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 items-center border-t-[1.5px] border-slate-200 py-4">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            className="object-contain"
            src={item.selectedImage.image}
            alt={item.name}
            width={70}
            height={70}
            sizes="100vw" // Add this line
            />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImage.color}</div>
        </div>
      </div>

      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default OrderItem;
