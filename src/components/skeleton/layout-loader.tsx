"use client";
import { Loader2 } from "lucide-react";


const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
      {/* <Image src={logo} alt="logo" height={80} width={80} /> */}
      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Yuklanmoqda...
      </span>
    </div>
  );
};

export default LayoutLoader;
