import { Card, CardContent } from "../../../../components/ui/card";
import CommentSection from "./comment/Comment";
import CommentFooter from "./commentFooter";
import { Messages } from "../../../../svg";
import { useGetCommentsQuery } from "../../../../features/comments/comment";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { useState } from "react";
import { Skeleton } from "../../../../components/ui/skeleton";

const CommentsSection = () => {

  const { data, isSuccess, isLoading, isError, error } =
    useGetCommentsQuery("");
  const [propValue, setPropValue] = useState<string>("");

  return (
    <Card className="w-full   h-[412px] border border-gray-300 rounded-lg">
      <div className="flex gap-2 items-center px-4 py-2 border-b border-gray-300">
        <div className="w-4 h-4 text-primary">
          <Messages />
        </div>
        <h2 className="font-bold text-gray-700">Izohlar ({data?.count})</h2>
      </div>

      <div
        className={`flex flex-col h-full  ${isSuccess && data.count !== 0 ? "justify-between" : "justify-end"
          } `}
      >
        <div className="my-1 overflow-y-auto h-[315px]">
          {isSuccess &&
            data.count > 0 &&
            data.results.map((item) => (
              <CommentSection data={item} setPropValue={setPropValue} />
            ))}

          {isLoading &&
            Array(10)
              .fill(0)
              .map((_, index: number) => (
                <Card key={index}>
                  <CardContent className="flex gap-2 items-center">
                    <div className="w-11 h-11 rounded-full p-[2px] bg-background overflow-hidden relative z-20 mb-2">
                      <Skeleton className="w-full h-full rounded-full" />
                    </div>
                    <div className="w-[80%]">
                      <Skeleton className="w-full mb-2 h-8 rounded-2xl" />
                      <Skeleton className="w-40 h-2 rounded-2xl" />
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {isSuccess && data.count == 0 && (
          <Alert className="w-[96%] m-3" variant={"outline"} color="warning">
            <AlertDescription className="w-full text-center">
              Ma'lumot topilmadi
            </AlertDescription>
          </Alert>
        )}

        {isError && (
          <Alert
            className="w-[96%] m-3"
            variant={"outline"}
            color="destructive"
          >
            <AlertDescription className="w-full text-center">
              Status:{(error as any)?.originalStatus}, Xatolik qaytdi
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-12">
          <CommentFooter propValue={propValue} setPropValue={setPropValue} />
        </div>
      </div>
    </Card>
  );
};

export default CommentsSection;
