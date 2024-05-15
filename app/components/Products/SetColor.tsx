"use client";

import {
  CartProductType,
  SelectedImageType,
} from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  images: SelectedImageType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImageType) => void; // Ensure that the handleColorSelect function returns voi
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">COLOR:</span>
        <div className="flex items-center gap-2">
          {images.map((image) => {
            return (
              <div
                onClick={() => handleColorSelect(image)}
                key={image.color}
                className={`w-7 h-7 rounded-full border-teal-300 flex items-center justify-center ${
                  cartProduct.selectedImage.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                } `}
              >
                <div
                  className="w-5 h-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                  style={{ backgroundColor: image.color }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
