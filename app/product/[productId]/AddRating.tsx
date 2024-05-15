"use client";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/input";
import Button from "@/app/components/Button";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user: (SafeUser & { orders: Order[] }) | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error("Please select a rating");
    }
    const ratingData = { ...data, product: product, userId: user?.id };

    axios
      .post("/api/rating", ratingData)
      .then(() => {
        setIsLoading(true);
        toast.success("Rating submitted successfully");
        router.refresh();
        reset();
        reset();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) return null;

  const deliveredOrder = user?.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );
  const userReview = product?.reviews.find((review: Review) => {
    return review.userId === user.id;
  });
  // console.log(userReview, deliveredOrder);

  if (userReview || !deliveredOrder) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={false}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isloading ? "Loading..." : "Rate Product"}
        disabled={isloading}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
