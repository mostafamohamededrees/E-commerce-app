"use client";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  register,
  disabled,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        type={type}
        autoComplete="off"
        placeholder=""
        disabled={disabled}
        {...register(id, { required })}
        className={`
        peer
        w-full
        p-4
        pt-6
        bg-white
        font-light
        rounded-md
        border-2
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-500" : "border-slate-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-slate-300"}
    `}
      />
      <label
        className={`
      absolute
      text-md
      duration-150
      transform
      -translate-y-3
      top-5
      z-10
      origin-[0]
      left-4
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-slate-400"}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
