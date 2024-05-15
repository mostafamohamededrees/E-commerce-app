"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/FormatPrice";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
interface CartClientProps {
  currentUser?: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
        </div>
        <div>
          <Link className="text-blue-500 flex items-center gap-1 mt-2" href="/">
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Heading title="Shopping Cart" center />
      </div>
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start ">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="flex justify-between mt-4">
        <div className="w-[90px]">
          <Button
            label="Clear Cart"
            onClick={() => {
              handleClearCart();
              toast.success("Cart cleared");
            }}
            small
            outline
          />
        </div>
        <div>
          <div className="text-sm flex flex-col gap-1">
            <div className="flex justify-between w-full text-base mb-2 font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotalAmount)}</span>
            </div>
            <p className="text-slate-500">
              Taxes and shipping calculated at checkout
            </p>
            <Button
              label={currentUser ? "Checkout" : "Login to checkout"}
              outline={currentUser ? false : true}
              onClick={() => {
                currentUser ? router.push("/checkout") : router.push("/login");
              }}
            />
            <Link
              className="text-blue-500 flex items-center gap-1 mt-2"
              href="/"
            >
              <MdArrowBack />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartClient;
