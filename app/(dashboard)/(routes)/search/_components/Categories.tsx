"use client";
import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcMultipleDevices,
  FcSalesPerformance,
  FcSelfie,
  FcReading,
  FcCommandLine,
  FcReadingEbook,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./CategoryItem";

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcMultipleDevices,
  Engineering: FcEngineering,
  Mathematics: FcSalesPerformance,
  "Life Style": FcSelfie,
  Physics: FcReading,
  Languages: FcReadingEbook,
  "Computer Engineering": FcCommandLine,
};

interface CategoriesProps {
  items: Category[];
}
export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
