"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/FormatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { useSearchParams } from "next/navigation";

interface CheckoutFormProps {
  clientSecret: string;
  handlePaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handlePaymentSuccess,
}) => {
  const searchParams = useSearchParams()

  const { cartTotalAmount, handleSetPaymentIntent, handleClearCart } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isloading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handlePaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout success");
          handleClearCart();
          handlePaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
        setShowForm(true);
      });
  };
  return (
    <>
      {!showForm && (
        <form onSubmit={handleSubmit} id="payment-form">
          <div className="mb-6">
            <Heading title="Enter your details to complete checkout" />
          </div>
          <h2 className="mt-4 mb-2 font-semibold">Address Information </h2>
          <AddressElement
            options={{
              mode: "shipping",
              allowedCountries: ["US", "CA", "EG"],
            }}
          />
          <h2 className=" mt-4 mb-2 font-semibold">Payment Information </h2>
          <PaymentElement
            id="payment-element"
            options={{
              layout: "tabs",
            }}
          />
          <div className="py-4 text-center text-slate-700 text-xl font-bold">
            Total: {formattedPrice}
          </div>

          <Button
            label={isloading ? "Processing" : "Pay now"}
            disabled={isloading || !stripe || !elements}
            onClick={() => {}}
          />
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
