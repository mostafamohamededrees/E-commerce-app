import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}
const btnStyle = "w-7 h-7 border-[1.2px] border-slate-300 rounded cursor-pointer";
const SetQuentity: React.FC<SetQtyProps> = ({
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
  cartCounter,
}) => {
  
  return (
    <div className="flex items-center gap-8">
      {cartCounter ? null : <div className="font-semibold ">QUANTITY</div>}
      <div className="flex items-center text-base gap-4">
        <button className={btnStyle} onClick={handleQtyDecrease}>-</button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyle} onClick={handleQtyIncrease}>+</button>
      </div>
    </div>
  );
};

export default SetQuentity;
