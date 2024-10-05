"use client";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Icon } from "@iconify/react";
import { User, Phone, Location } from "../../../svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import Image from "next/image";
import CustomerUpdates from "../updates-customers/page";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { ResultDetails } from "../../../interfaces/customer";


const ContactInformations = ({ data }: { data: ResultDetails | undefined }) => {


  const dataUser = [
    {
      title: "F.I.O",
      position: data?.name,
      icon: User,
    },
    {
      title: "Telefon raqam",
      position: data?.phone_number,
      icon: Phone,
    },
    {
      title: "Manzil",
      position: data?.location?.name,
      icon: Location,
    },
  ];




  return (
    <Card className="space-y-8 w-auto min-h-[270px] p-4">
      <div className="flex justify-between items-start">

        <div className="flex items-center gap-2">


          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="h-6 w-6 rounded-full"
                  size={"sm"}
                  color={
                    data?.status === "in_base" ? "primary"
                      : data?.status === "active" ? "success"
                        : data?.status === "in_progress" ? "warning"
                          : data?.status === "frozen" ? "info" : "destructive"
                  }

                >?</Button>
              </TooltipTrigger>
              <TooltipContent color={
                data?.status === "in_base" ? "primary"
                  : data?.status === "active" ? "success"
                    : data?.status === "in_progress" ? "warning"
                      : data?.status === "frozen" ? "info" : "destructive"
              }>
                <p>
                  {
                    data?.status === "in_base" ? "Asosiy ba'zada"
                      : data?.status === "active" ? "Aktiv"
                        : data?.status === "in_progress" ? "Jarayonda"
                          : data?.status === "frozen" ? "Muzlatilgan" : "Arxiv"
                  }
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="text-lg font-medium text-default-800">
            Aloqa Ma'lumotlari
          </p>
        </div>
        <Dialog >
          <DialogTrigger asChild>
            <Button>
              <Icon className="w-4 h-4" icon="heroicons:pencil-square" />
            </Button>
          </DialogTrigger>

          <DialogContent size="5xl" >
            <DialogHeader>
              <DialogTitle className="text-base font-medium ">
                Ma'lumotlarni o'zgartirish
              </DialogTitle>
            </DialogHeader>
            <CustomerUpdates />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-6 2xl:gap-20">
        {dataUser.map((item: any, index) => (
          <div key={`about-${index}`} className="flex items-center gap-2">
            <div className="bg-default-100 dark:bg-default-50 text-primary h-10 w-10 grid place-content-center rounded">
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-default-900 ">
                {item.title}
              </div>
              <div className="text-xs font-medium text-default-600">
                {item.position}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:flex lg:justify-between items-start gap-4 lg:w-[90%]">
        <div className="space-y-2 overflow-x-auto h-[110px] pr-3">
          <p className="font-medium text-default-900">Uskunalar</p>

          {
            data?.products?.map(product => (
              <div className="flex items-center gap-2 rounded-2xl sm:w-[450px]  hover:bg-default-200 bg-default-100 p-1 px-2 text-default-800">
                <Image
                  src={product.image}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="w-[30px] object-cover h-[30px] rounded-full "

                />
                <p >
                  {product?.name}
                </p>
              </div>
            ))
          }

        </div>
        <div className="space-y-2 lg:m-0 mt-5">
          <p className="font-medium text-default-900">Yaratgan sotuvchi</p>
          <div className="flex items-center gap-2">

            <Avatar className="rounded-full h-8 w-8">
              <AvatarImage src={data?.original_seller?.image_url} alt="customer" />
              <AvatarFallback className="rounded uppercase bg-primary/30 text-primary">
                {data?.original_seller?.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <p className="font-medium text-default-700">{data?.original_seller?.name}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default ContactInformations;
