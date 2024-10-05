import { formatCustomDate } from "../../../components/formatters/date-formatter";
import { Location } from "../../../svg";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { CommentType } from "../../../interfaces/commit-page";

interface CustomerCardProps {
  item: CommentType;
  index: number;
}

const TopSellerComments = ({ item, index }: CustomerCardProps) => {
  return (
    <>
      <div className="flex justify-between items-center gap-3  w-[80%]  flex-col shadow hover:bg-default-50 rounded-lg">
        <div className="flex justify-between items-center gap-3 w-full bg-gray-200 dark:bg-gray-600 p-2 py-1 px-3 rounded-t-lg">
          <div className="flex gap-5">
            <div className="text-sm font-medium text-default-800 mb-1 whitespace-nowrap">
              #{index}
            </div>
            <div className="font-medium  mb-1 whitespace-nowrap">
              {item.customer.name}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Location className="h-5 w-5" />{" "}
            <span className="text-xs font-medium text-default-900 ">
              {item.customer.location}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center gap-3 w-full px-3 pb-2">
          <div className="relative inline-block">
            <Avatar>
              <AvatarImage src={item.seller.image} />
              <AvatarFallback>
                {item.seller.full_name?.slice(0, 2).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full">
            <div className="flex w-full justify-between">
              <div className="text-sm font-medium text-default-800 mb-1 whitespace-nowrap">
                {item.seller.full_name}
              </div>
              <div className="text-[12px] font-medium text-default-800 mb-1 whitespace-nowrap">
                {formatCustomDate(item.created_at)}
              </div>
            </div>
            <div className="text-xs text-default-600 whitespace-nowrap">
              {item.text}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellerComments;
