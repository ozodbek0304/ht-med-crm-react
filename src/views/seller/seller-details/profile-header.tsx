"use client";
import coverImage from "@/assets/user-cover.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Fragment, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import UpdateSellerModal from "../seller.tsx/update-seller";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SellerDetailsItem } from "@/interfaces/seller-page";

interface statetype {
  setValueText: any;
  valueText: string;
  sellerDetails: SellerDetailsItem | undefined
}

const ProfileHeader = ({ setValueText, valueText, sellerDetails }: statetype) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Fragment>
      <Card className="mt-6 rounded-t-2xl ">
        <CardContent className="p-0">
          <div
            className="relative h-[200px] lg:h-[296px] rounded-t-2xl w-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="flex items-center gap-4 absolute left-10  -bottom-2 lg:-bottom-8">
              <div>


                <Avatar className="rounded-full h-32 w-32">
                  <AvatarImage src={sellerDetails && sellerDetails.image_url} alt="customer" />
                  <AvatarFallback className="rounded uppercase bg-warning text-white text-2xl">
                    {sellerDetails?.full_name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>



              </div>
              <div>
                <div className="text-xl lg:text-2xl font-semibold text-primary-foreground mb-1">
                  {sellerDetails?.full_name}
                </div>
                <div className="text-xs lg:text-sm font-medium text-default-100 dark:text-default-900 pb-1.5">
                  Ijrochi direktor
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              asChild
              className="absolute bottom-5 right-6 rounded px-5 hidden lg:flex"
              size="sm"
            >
              <Link href="#">
                <Icon className="w-4 h-4 " icon="heroicons:pencil-square" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-end gap-4 lg:gap-8 p-4">
            <div className="flex gap-5">
              <p
                onClick={() => setValueText("active")}
                className={`font-medium  hover:text-blue-500 ${valueText == "active" ? "text-blue-600" : "text-default-800"
                  } cursor-pointer`}
              >
                Asosiy ma'lumotlar
              </p>
              <p
                onClick={() => setValueText("no-active")}
                className={`font-medium hover:text-blue-500  ${valueText == "no-active"
                  ? "text-blue-600"
                  : "text-default-800"
                  } cursor-pointer`}
              >
                Aktiv / Jarayondagi xaridorlar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <UpdateSellerModal
        userDetails={sellerDetails}
        modalTitle="Sotuvchini tahrirlash"
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Fragment>
  );
};

export default ProfileHeader;
