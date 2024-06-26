"use client";

import Image from "next/legacy/image";
import {
  CartProductType,
  SelectedImageType,
} from "@/app/product/[productId]/ProductDetails";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImageType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div
      className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px]
    sm:min-h-[400px] "
    >
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border  h-full max-h-[500px] min-h-[300px]  sm:min-h-[400px]   ">
        {product.images.map((image: SelectedImageType) => {
          return (
            <div
              onClick={() => handleColorSelect(image)}
              key={image.color}
              className={`
            relative w-[80%] aspect-square rounded border-teal-300 ${
              cartProduct.selectedImage.color === image.color
                ? "border-[1.5px]"
                : "border-none"
            }`}
            >
              <Image
                className="object-contain "
                src={image.image}
                alt={image.color}
                width={200}
                height={200}
                sizes="100vw" // Add this line
                />
            </div>
          );
        })}
      </div>
      <div className="aspect-square relative col-span-5">
        <Image
          className="object-contain w-full h-full max-h-[500px] min-h-[300px]  sm:min-h-[400px] "
          src={cartProduct.selectedImage.image}
          alt={cartProduct.selectedImage.color}
          width={200}
          height={200}
          sizes="100vw" // Add this line
          />
      </div>
    </div>
  );
};

export default ProductImage;
