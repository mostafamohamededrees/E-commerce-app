"use client";

import moment from "moment";
import Heading from "../Heading";
import { Rating } from "@mui/material";
import Avatar from "../Avatar";

interface ListRatingProps {
  product: any;
}

const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if (product.reviews.length === 0) return null;
  console.log(product)
  return (
    <div>
      <Heading title="Ratings & Reviews" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className=" max-w-[300px] ">
                <div className="flex gap-2 items-center ">
                  <Avatar src={review?.user.image} />
                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-light">
                    {moment(review.createDate).fromNow()}
                  </div>
                </div>
                <Rating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className=" my-4" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
