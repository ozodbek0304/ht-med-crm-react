import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Phone, Location, Calender, CalenderCheck } from "../../../svg";
import { formatPhoneNumber } from "../../../components/formatters/phone-formatter";
import { SellerDetailsItem } from "../../../interfaces/seller-page";

interface UserInfoItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}

interface SellerInfoProps {
    data: SellerDetailsItem | undefined
}


const SellerInfo = ({ data }: SellerInfoProps) => {
    const userInfo: UserInfoItem[] = [
        {
            icon: Phone,
            label: "Telefon raqami",
            value: formatPhoneNumber(data?.personal_phone)
        },
        {
            icon: Location,
            label: "Yashash manzili",
            value: String(data?.address)
        },
        {
            icon: Location,
            label: "Ro'yhatda turgan joyi",
            value: "Chilonzor IIB"
        },
        {
            icon: CalenderCheck,
            label: "JSHIR",
            value: "50502035720058"
        },
        {
            icon: Calender,
            label: "Pasport nusxasi ",
            value: "fayl yuklab olish"
        },
    ]
    return (
        <Card className="w-full">
            <CardHeader className="border-none mb-0">
                <CardTitle className="text-lg font-medium text-default-800">Ma'lumotlar</CardTitle>
            </CardHeader>
            <CardContent className="px-4">

                <ul className="space-y-6">
                    {
                        userInfo.map((item, index) => (
                            <li
                                key={`user-info-${index}`}
                                className="flex items-center justify-between w-full"
                            >
                                <div className="flex-none   flex items-center gap-1.5">
                                    <span>{<item.icon className="w-4 h-4 text-primary" />}</span>
                                    <span className="text-sm font-medium text-default-900">{item.label}:</span>
                                </div>
                                <div className="text-sm text-default-600">{item.value}</div>
                            </li>
                        ))
                    }
                </ul>

            </CardContent>
        </Card>
    );
};

export default SellerInfo;