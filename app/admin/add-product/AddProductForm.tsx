"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/Inputs/CategoryInput";
import CustomCheckbox from "@/app/components/Inputs/CustomCheckbox";
import SelectColor from "@/app/components/Inputs/SelectColor";
import TextArea from "@/app/components/Inputs/TextArea";
import Input from "@/app/components/Inputs/input";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const searchParams = useSearchParams()


  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // upload images to firebase
    // save product to mongoDB
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Please select a category");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No images selected");
    }

    const handleImageUploads = async () => {
      toast("Creating product, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            // we need the file name uniquely for each image
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storge = getStorage(firebaseApp);
            const storgeRef = ref(storge, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storgeRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  // console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      // console.log("Upload is paused");
                      break;
                    case "running":
                      // console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  reject(error);
                },
                () => {
                  // handle successful upload on complete
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      // console.log("file available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      // console.log("error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (err) {
        setIsLoading(false);
        // console.log("Error handling image uploads", err);
        return toast.error("Error handling image uploads");
      }
    };

    // save product to mongoDB
    await handleImageUploads();

    const productData = { ...data, images: uploadedImages };
    // console.log("productData >> ", productData);

    axios
      .post(`/api/product`, productData)
      .then(() => {
        setIsProductCreated(true);
        router.refresh();
        toast.success("Product created successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong while saving product into database");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This Product is in stock "
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto ">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }

            return (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the avilable product colors and upload their images
          </div>
          <div className="text-sm">
            you must upload an image for each color selected otherwise your
            color selection will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageToState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add Product"}
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
