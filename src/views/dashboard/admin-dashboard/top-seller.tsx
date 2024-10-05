import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { formatPhoneNumber } from "../../../components/formatters/phone-formatter";
import TopBrowserChart from "../../../components/chart/basic-donut";
import { SellerResults } from "../../../interfaces/seller-page";



const TopSeller = ({ full_name, image, seller_coins, phone }: SellerResults) => {

    return (
        <>
            <div className="flex justify-between items-center gap-7 sm:gap-4 w-full p-2 lg:w-[350px]  hover:bg-default-50 rounded-lg">

                <div className="flex justify-between items-center gap-3">
                    <div className="relative inline-block">
                        <Avatar>
                            <AvatarImage src={image} />
                            <AvatarFallback>{full_name?.slice(1, 3)?.toLocaleUpperCase()}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-default-800 mb-1 whitespace-nowrap"> {full_name}</div>
                        <div className="text-xs text-default-600 whitespace-nowrap">{formatPhoneNumber(phone)}</div>
                    </div>
                </div>



                <div className="w-[100px]">
                {seller_coins?.length > 0 && <TopBrowserChart data={seller_coins} height={100} show={false} sizeTotal={"10px"} />}
                </div>


            </div>
        </>
    );
};

export default TopSeller;