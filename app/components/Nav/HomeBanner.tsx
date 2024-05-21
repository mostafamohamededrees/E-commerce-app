import React from "react";
import Image from "next/legacy/image";

export default function HomeBanner() {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row  items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center ">
          <h1 className="text-4xl md:text-6xl text-white mb-4 font-bold">
            Summer Sale
          </h1>
          <p className=" text-lg md:text-xl mb-2 text-white">
            Enjoy discouts on selected items
          </p>
          <p className="text-2xl  md:text-5xl  text-yellow-400 font-bold ">
            GET 50% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            alt="banner"
            width={500} 
            height={300} 
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  );
}
