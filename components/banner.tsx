import { AlertTriangle, CheckCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center text-sm flex items-center w-full",
  {
    variants: {
      vaiant: {
        success: "border-green-500 bg-green-50 text-green-800",
        error: "border-red-500 bg-red-50 text-red-800",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-800",
        info: "border-blue-500 bg-blue-50 text-blue-800",
      },
    },
  }
);

export const Banner = () => {
  return <div>Banner</div>;
};
