"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col  items-center cursor-pointer rounded-xl border-2 p-4 transition hover:border-slate-500 gap-2 
      ${selected ? "border-slate-500" : "border-slate-200"}`}
    >
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;
