"use client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Inputs/input";
import router from "next/router";
import {
  FieldValues,
  useForm,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser?: SafeUser | null;
}
const RegisterForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await axios.post("/api/register", data).then(() => {
      toast.success("Account created successfully");
    });

    // Add a slight delay before the sign-in attempt
    await new Promise((resolve) => setTimeout(resolve, 100));

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Logged in");
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return <p>Logged in . Redirecting ...</p>;
  }
  return (
    <>
      <Heading title="Sign Up" />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        label={isLoading ? "loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className=" text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
