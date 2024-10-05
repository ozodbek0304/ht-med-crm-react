import React, { useState } from "react";
import ProfileHeader from "./profile-header";
import { Label } from "../../../components/ui/label";
import { Progress } from "../../../components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import SellerInfo from "./seller-info";
import { Loader2 } from "lucide-react";
import LineColumn from "../../../components/chart/line-chart";
import DatePickerWithRange from "./date-picker-with-range";
import { useParams } from "next/navigation";
import { useGetDetailsQuery } from "../../../features/seller/seller";
import SellerCustomersPages from "../customers/customer-page";


const SellerDetails = () => {
  const { id } = useParams()

  const { data, isLoading, isSuccess, status, isError, error } = useGetDetailsQuery(Number(id))

  const [valueText, setValueText] = useState("active");
  return (
    <div>
      {isLoading ? <div className="w-full  flex justify-center items-center"><Loader2 className="animate-spin w-6 h-6" /></div> :
        <>
          <ProfileHeader sellerDetails={data} setValueText={setValueText} valueText={valueText} />

          {valueText == "active" ? (
            <div className="pt-4 grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-5 space-y-4">
                <div className="flex flex-col items-end gap-1">
                  <Card className="w-full">
                    <CardHeader className="border-none mb-0 pb-0 ">
                      <CardTitle className="text-lg font-medium text-default-800">
                        Unimdorlik(oylik)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4">
                      <div className="flex flex-col items-end gap-1">
                        <Label className="text-sm font-medium text-default-700">
                          {data?.percentage} ball
                        </Label>
                        <Progress
                          value={62}
                          color="primary"
                          isStripe
                          className="w-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <SellerInfo data={data} />
              </div>
              <div className="col-span-12 lg:col-span-7 space-y-4">
                <div className="lg:flex lg:gap-5 w-full p-3 bg-white dark:bg-slate-800 rounded-lg ">
                  <div className="border border-default-300 rounded-lg my-3 lg:m-0 w-full">
                    <DatePickerWithRange />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 w-full lg:flex justify-between ">
                  <div className="lg:w-[50%]">
                    {/* <BasicPie /> */}
                  </div>
                  <div className="lg:w-[50%]">
                    {/* <BasicDonut /> */}
                  </div>
                </div>

                <div className="w-full bg-white dark:bg-slate-800 rounded-lg">
                  <LineColumn text="Ish balli" />
                </div>
              </div>
            </div>
          ) : (
            <SellerCustomersPages />
          )}
        </>
      }
    </div>
  );
};

export default SellerDetails;
