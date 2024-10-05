import { useAuth } from "../../../store";
import CommentsSection from "./comments/comments";
import ContactInformations from "./contact-informations";
import CustomerTime from "./customerTime";
import ProfileDetails from "./profile-details";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import Link from "next/link";
import { useLazyGetItemDetailsSellersQuery, useLazyGetItemsDetailsQuery } from "../../../features/customer/customer";
import { useParams } from "next/navigation";
import { useEffect } from "react";



const CustomerProfile = () => {
  const { user } = useAuth((state) => state);
  const { pid } = useParams<{ pid: string }>();
  const [getItemsDetails, { data: customerData }] = useLazyGetItemsDetailsQuery();
  const [getItemDetailsSellers, { data: sellersData }] = useLazyGetItemDetailsSellersQuery();

  useEffect(() => {
    if (pid) {
      getItemsDetails(pid);
      getItemDetailsSellers(pid)
    }
  }, [pid, getItemsDetails]);

  console.log(sellersData);



  return (
    <div className="w-full space-y-4">

      <div className="flex gap-4 w-full overflow-x-auto px-2">
        {user.role === "admin" &&
          sellersData?.sellers?.map((item) => (
            <Link key={item.id} href={"/seller-details"} className="bg-white dark:bg-slate-800 cursor-pointer shadow-sm flex justify-between items-center gap-7 sm:gap-4  p-2 px-4   hover:bg-default-50 rounded-lg">
              <div className="flex justify-between items-center gap-3 w-full">
                <div className="relative inline-block">
                  <Avatar>
                    <AvatarImage src={item?.image_url} />
                    <AvatarFallback>{item?.full_name?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="w-full">
                  <div className="flex w-full justify-between">
                    <div className="text-sm font-medium text-default-800 mb-1 whitespace-nowrap">
                      {item.full_name}
                    </div>
                  </div>
                  <div className="text-xs text-default-600 whitespace-nowrap">
                    {item.phone}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>



      <div className="lg:flex  gap-5">
        <div className="w-full lg:w-[414px]">
          <CustomerTime data={customerData} />
        </div>
        <div className="w-full">
          <ContactInformations data={customerData} />
        </div>
      </div>

      <div className="flex  flex-wrap gap-5 ">
        <div className="w-full lg:w-[414px] h-full">
          <ProfileDetails data={customerData} />
        </div>
        <div className="flex-grow">
          <CommentsSection />
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
