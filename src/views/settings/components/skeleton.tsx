import { Skeleton } from "@/components/ui/skeleton";


import {
    Card,
    CardContent,
} from "@/components/ui/card";

const SettingsSkeleton = () => {
    return (
        <Card className="w-full">
            <CardContent className=" my-5 w-full">
                <div className=" w-full">
                    {
                        Array(10).fill(0).map((_, index: number) => (
                            <Skeleton key={index} className="w-full mb-2 h-16" />
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    );
};
export default SettingsSkeleton;