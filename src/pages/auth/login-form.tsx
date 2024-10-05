"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";
import logo from "@/assets/Layer_1 (1).png";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAuth } from "@/store";
import { menusConfigAdmin, menusConfigSeller } from "@/config/menus";
import Image from "next/image";
import { API_ENDPOINTS } from "@/api/api-endpoints";
import { PhoneNumber } from "@/components/formatters/phone-number";
import axios from "axios";
import { baseURL } from "@/api/http";

const schema = z.object({
  phone: z.string().min(9, { message: "Telefon raqam kamida 9 ta raqam bo'lishi kerak" }).regex(/^\+998\d{9}$/, { message: "Telefon raqam noto'g'ri formatda" }),
  password: z.string().min(1, { message: "Parol kamida 1 ta belgi bo'lishi kerak" }),
});

interface Link {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}


const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const { setRoleLink, setUser } = useAuth((state) => state);



  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });



  // Login funktsiyasi
  const onSubmit = (data: any) => {
    startTransition(async () => {
      try {
        let response: any = await axios.post(baseURL + API_ENDPOINTS.LOGIN, data);
        if (response?.status == 200) {
          toast.success(response?.data?.msg || "Muvaffaqiyatli kirdingiz!");
          window.location.assign("/dashboard");
          const isSuperUser = response?.data?.role;
          if (isSuperUser === 'admin') {
            setRoleLink(menusConfigAdmin);
          } else {
            setRoleLink(menusConfigSeller);
          }
          reset();
          setUser(response?.data);
        } else {
          toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        }

      } catch (error: any) {
        toast.error((error?.response?.data?.msg ? error?.response?.data?.msg : '') + ' ' + (error?.response?.data?.error ? error?.response?.data?.error : '') + ' ' + error.message || "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    });
  };


  return (
    <div className="w-full ">
      <Link href="/dashboard" className="flex justify-center mb-5">
        <Image src={logo} alt="logo" height={60} width={60} />
      </Link>
      <div className="text-center font-medium text-default-800 text-[20px] lg:text-[24px]">
        Tizimga kirish
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 2xl:mt-7">
        <div className="relative">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <>
                <PhoneNumber
                  id="phone"
                  field={field}
                  type="phone"
                  options={{
                    prefix: "+998",
                    blocks: [4, 2, 3, 2, 2],
                    uppercase: true,
                    numericOnly: true,
                  }}
                  placeholder="Telefon raqam"
                  className={cn("peer", {
                    "border-destructive": errors.phone,
                  })}
                />

                <Label
                  htmlFor="phone"
                  className="rounded-md absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2
               peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
               peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Telefon raqam
                </Label>
              </>
            )}
          />
        </div>

        {errors.phone && (
          <div className="text-destructive mt-2">{errors.phone.message}</div>
        )}

        <div className="relative mt-6">
          <Input
            removeWrapper
            type={passwordType === "password" ? "password" : "text"}
            id="password"
            size={!isDesktop2xl ? "xl" : "lg"}
            placeholder=" "
            disabled={isPending}
            {...register("password")}
            className={cn("peer", {
              "border-destructive": errors.password,
            })}
          />
          <Label
            htmlFor="password"
            className={cn(
              "rounded-md absolute text-base text-default-600  duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0]   bg-background  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75  peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1",
              {
                " text-sm ": isDesktop2xl,
              }
            )}
          >
            Parolingiz
          </Label>
          <div
            className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
            onClick={togglePasswordType}
          >
            {passwordType === "password" ? (
              <Icon icon="heroicons:eye" className="w-4 h-4 text-default-400" />
            ) : (
              <Icon icon="heroicons:eye-slash" className="w-4 h-4 text-default-400" />
            )}
          </div>
        </div>

        {errors.password && (
          <div className="text-destructive mt-2">{errors.password.message}</div>
        )}

        <Button
          className="w-full mt-5"
          disabled={isPending}
          size={!isDesktop2xl ? "lg" : "md"}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Tekshirilmoqda..." : "Kirish"}
        </Button>
      </form>


    </div>
  );
};

export default LogInForm;
