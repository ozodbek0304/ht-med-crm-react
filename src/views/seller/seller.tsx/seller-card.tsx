
import Image from "next/image";
import { Card, CardContent } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { SellerResults } from "../../../interfaces/seller-page";

const SellerCard = ({ full_name, image, seller_coins, phone }: SellerResults) => {
  return (
    <Card>
      <CardContent className="p-0 dark:shadow-slate-400">
        <div className="relative  h-[330px] rounded-lg shadow-md">
          {/* <Image
            src={background}
            alt="image"
            className="h-[50%]  w-full rounded-t-lg "
            priority={true}
          /> */}


          <Avatar className=" w-[110px] object-cover h-[110px] rounded-full absolute top-[43%] left-[50%] translate-x-[-50%] translate-y-[-43%]">
            <AvatarImage src={image} alt="customer" />
            <AvatarFallback className="rounded uppercase bg-primary text-white text-2xl">
              {full_name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="p-3 space-y-4 mt-10 text-center">
            <div className="space-y-1">
              <p className="font-medium text-base lg:text-[18px] hover:text-blue-500 cursor-pointer ">
                {full_name}
              </p>
              <p className="text-customText lg:text-[14px]  hover:text-blue-500 cursor-pointer">
                {phone}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              {/* <Label className="font-medium text-default-700 text-[13px]">
                  {percentage} ball
                </Label>
                <Progress
                  value={percentage}
                  color="primary"
                  isStripe
                  className="w-full h-[10px]"
                /> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerCard;
