import { addPeriodToThousands } from "../../../components/formatters/price-formatter";
import { CheckShape, Spam, User } from "../../../svg";
import { useGetItemCustomerCountQuery } from "../../../features/customer/customer";
import { cn } from "../../../lib/utils";
import { Icon } from "@iconify/react";
import { Trash } from "lucide-react";
const CustomerHeading = () => {
  const { data } = useGetItemCustomerCountQuery()

  const dataStatusCount = [
    {
      text: "Umumiy baza",
      total: data?.in_base ? addPeriodToThousands(data?.in_base) : 0,
      color: "primary",
      icon: <CheckShape className="w-3.5 h-3.5" />
    },
    {
      text: "Aktiv xaridorlar",
      total: data?.active ? addPeriodToThousands(data?.active) : 0,
      color: "success",
      icon: <User className="w-3.5 h-3.5" />
    },
    {
      text: "Jarayondagilar",
      total: data?.in_progress ? addPeriodToThousands(data?.in_progress) : 0,
      color: "warning",
      icon: <User className="w-3.5 h-3.5" />
    },
    {
      text: "Muzlatilganlar",
      total: data?.frozen ? addPeriodToThousands(data?.frozen) : 0,
      color: "info",
      icon: <Spam className="w-3.5 h-3.5" />
    },
    {
      text: "Karzinka",
      total: data?.archived ? addPeriodToThousands(data?.archived) : 0,
      color: "destructive",
      icon: <Trash className="text-white w-3.5 h-3.5" />
    },

  ];


  return (
    <>
      {dataStatusCount?.map((item, index) => (
        <div
          key={`reports-state-${index}`}
          className={cn(
            "flex flex-col gap-1.5 p-4 rounded-sm overflow-hidden bg-primary/10  items-start relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden ",
            {
              "bg-primary/40  dark:bg-primary/70": item.color === "primary",
              "bg-orange-50 dark:bg-orange-500": item.color === "warning",
              "bg-green-50 dark:bg-green-500": item.color === "success",
              "bg-red-50 dark:bg-red-500 ": item.color === "destructive",
              "bg-blue-50 dark:bg-blue-500 ": item.color === "info",
            }
          )}
        >
          <span
            className={cn(
              "h-[95px] w-[95px] rounded-full bg-primary/40 absolute -top-8 -right-8 ring-[20px] ring-primary/30",
              {
                "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40": item.color === "primary",
                "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400": item.color === "warning",
                "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400": item.color === "success",
                "bg-red-200 ring-red-100 dark:bg-red-300 dark:ring-red-400": item.color === "destructive",
                "bg-blue-200 ring-blue-100 dark:bg-blue-300 dark:ring-blue-400": item.color === "info",
              }
            )}
          ></span>
          <div className={`w-8 h-8 grid place-content-center rounded-full border border-dashed border-${item.color} dark:border-primary-foreground/60`}>
            <span className={cn(`h-6 w-6 rounded-full grid place-content-center  bg-${item.color}`, {
              "dark:bg-[#EFF3FF]/30": item.color === "primary",
              "dark:bg-[#FFF7ED]/30": item.color === "warning",
              "dark:bg-[#ECFDF4]/30": item.color === "success",
              "dark:bg-[#FEF2F2]/30": item.color === "destructive"
            })}>
              {item.icon}
            </span>
          </div>
          <span className="mt-3 text-sm text-default-800 dark:text-primary-foreground font-medium capitalize relative z-10">
            {item.text}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold text-default-900  dark:text-primary-foreground">{item.total}</span>
            <Icon icon="heroicons:arrow-trending-up" className={`w-5 h-5 text-${item.color} dark:text-primary-foreground`} />
          </div>
        </div>
      ))}
    </>
  )
}

export default CustomerHeading