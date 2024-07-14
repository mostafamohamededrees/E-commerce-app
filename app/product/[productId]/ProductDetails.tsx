"use client";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/Products/ProductImage";
import SetColor from "@/app/components/Products/SetColor";
import SetQuentity from "@/app/components/Products/SetQuentity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdCheckCircle } from "react-icons/md";

interface ProductDetailsProps {
  product: any;
}
export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImage: SelectedImageType;
  price: number;
  quantity: number;
};
export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};
export const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();

  // Notification Success for adding product to cart
  const toastSuccess = () => {
    toast.success("Product added to cart");
  };

  // from useContext Hook
  const { handleAddProductToCart, cartProducts } = useCart();

  const [isProductInCart, setIsProductInCart] = useState(false);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImage: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );
      existingIndex > -1 && setIsProductInCart(true);
    }
  }, [cartProducts, product.id]);


  // Rating For Products
  const productRating =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, review: any) => acc + review.rating,
          0
        ) / product.reviews.length
      : 0;

  // When i click on the color to change the image
  const handleColorSelect = useCallback((value: SelectedImageType) => {
    setCartProduct((prev) => {
      return { ...prev, selectedImage: value };
    });
  }, []);

  // When i click on the quentity to increase or decrease the quentity
  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return {
        ...prev,
        quantity: prev.quantity === 99 ? 99 : prev.quantity + 1,
      };
    });
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity > 1 ? prev.quantity - 1 : 1 };
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <ProductImage
          cartProduct={cartProduct}
          product={product}
          handleColorSelect={handleColorSelect}
        />
      </div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700"> {product.name}</h2>
        <div className="text-2xl text-slate-900 font-bold ">${product.price}</div>
        <div className="flex items-center gap-2">

          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} Reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGOTY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-green-500" : "text-red-500"}>
          {product.inStock ? "In Stock " : " Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="flex items-center gap-1 mb-2 text-slate-500">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product Added To Cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal />
            <SetQuentity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => {
                  toastSuccess();
                  handleAddProductToCart(cartProduct);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
