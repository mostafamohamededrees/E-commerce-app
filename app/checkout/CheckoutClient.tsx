"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  StripeElement,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// interface PaymentData {
//   paymentIntent: {
//     client_secret: string;
//     id: string;
//   };
// }
const CheckoutClient = () => {
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentIntentCreated, setPaymentIntentCreated] = useState(false);



  // console.log("paymentIntent >>" + paymentIntent);
  // console.log("clientSecret >>" + clientSecret);
  // console.log(clientSecret ? "ewew" : "ewew");

  useEffect(() => {
    // create payment intent as soon as the page loads
    // if (cartProducts ) {
    if (cartProducts && !paymentIntentCreated) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status == 401) {
            router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
          setPaymentIntentCreated(true); // Set payment intent created flag
        })
        .catch((err) => {
          setError(true);
          toast.error("Something went wrong");
          // console.log("ERROR" + err);
        });
    }
  }, [paymentIntent, cartProducts, paymentIntentCreated]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  // console.log(paymentSuccess);
  

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  
  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handlePaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout... </div>}
      {error && (
        <div className="text-center text-rose-500">Something went wrong...</div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col gap-4 items-center">
          <div className="text-teal-500 text-center ">Payment Success</div>
          <div className="max-w-[220px] w-full ">
            <Button
              label="View Your Orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
