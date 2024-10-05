"use client";

import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";
import { Link } from "react-router-dom";
const ErrorBlock = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen  overflow-y-auto flex justify-center items-center p-10">
      <div className="w-full flex flex-col items-center">
        <div className="max-w-[740px]">
          {/* <Image
            src={theme === "dark" ? darkImage : lightImage}
            alt="error image"
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="mt-16 text-center">
          <div className="text-2xl md:text-4xl lg:text-5xl font-semibold text-default-900">
            Op! Sahifa topilmadi
          </div>
          <div className="mt-3 text-default-600 text-sm md:text-base">
            Siz qidirayotgan sahifada o'chirilgan bo'lishi mumkin
            nomi o'zgartirilgan yoki vaqtincha mavjud emas.
          </div>
          <Button asChild className="mt-9  md:min-w-[300px]" size="lg">
            <Link to="/dashboard" >Bosh sahifaga o'ting</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBlock;
