import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Phone, Map, ClipBoard2, ClipBoard, Calendar, Mail, Medical } from "../../../svg";
import { formatPhoneNumber } from "../../../components/formatters/phone-formatter";
import { formatCustomDate } from "../../../components/formatters/date-formatter";
import { ResultDetails } from "../../../interfaces/customer";


interface UserInfoItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: any;
}



const ProfileDetails = ({ data }: { data: ResultDetails | undefined }) => {

  const userInfo: UserInfoItem[] = [
    {
      icon: Map,
      label: "Sektor",
      value: data?.sector.name
    },
    {
      icon: Phone,
      label: "Telegram raqam",
      value: data?.telegram_phone,
    },
    {
      icon: ClipBoard2,
      label: "To'lov turi",
      value: data?.payment_type?.name,
    },
    {
      icon: ClipBoard,
      label: "To'lash tartibi",
      value: data?.payment_method?.name,
    },
    {
      icon: Calendar,
      label: "Qayta gaplashish vaqti",
      value: formatCustomDate(data?.recall_date ?? new Date()),
    },
    {
      icon: Mail,
      label: "Kelish manbai",
      value: data?.source?.name,
    },
    {
      icon: Medical,
      label: "Sektor (3)",
      value: data?.medical?.name
    },
    {
      icon: Phone,
      label: "Qo'shimcha raqam",
      value: formatPhoneNumber(data?.extra_phone ?? '+998 93 102 30 42')
    },

  ]


  return (
    <Card>
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">Ma'lumotlar</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <ul className="space-y-6">
          {
            userInfo.map((item, index) => (
              <li
                key={`user-info-${index}`}
                className="flex items-center justify-between"
              >
                <div className="flex-none flex items-center gap-1.5">
                  <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                  <span className="text-sm font-medium text-default-900">{item.label}:</span>
                </div>
                <div className=" text-sm text-default-600">{item.value}</div>
              </li>
            ))
          }
        </ul>

      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
