import { useGetItemsQuery } from "@/features/seller/seller";
import SellerCard from "./seller-card";
import SellerHeading from "./seller-heading";
import SkeletonPage from "@/components/skeleton/skeleton-page";
import { useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PaginationPage from "@/components/pagination/page";
import { useSellerStore } from "@/store/sellersStore";
import { SellerResults } from "@/interfaces/seller-page";




const SellerComponent = () => {
  const { queryParam, setQueryParam } = useSellerStore();
  const [currentPage, setCurrentPage] = useState(1);

  const queryStr = new URLSearchParams({
    ...(queryParam as Record<string, string>)
  }).toString();

  const { data, isError, isSuccess, error, isLoading } =
    useGetItemsQuery(queryStr);

  const pageCount = data?.count ? Math.round(Number(data.count) / 10) : 1;


  const handleNext = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      setQueryParam({ page: currentPage + 1 })

    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setQueryParam({ page: currentPage - 1 })
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setQueryParam({ page: pageNumber })
  };




  return (
    <div className="space-y-5">
      <SellerHeading />

      {isError && <Alert className="w-full " variant={"outline"} color="destructive">
        <AlertDescription className="w-full text-center">Status: {(error as any)?.originalStatus}, Xatolik yuz berdi</AlertDescription>
      </Alert>}


      {isSuccess && data.count == 0 &&
        <Alert className="w-full " variant={"outline"} color="warning">
          <AlertDescription className="w-full text-center">Ma'lumot topilmadi</AlertDescription>
        </Alert>
      }


      <div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 dark:bg-slate-900  rounded-lg">
        {isLoading &&
          Array(8)
            .fill(0)
            .map((_, index: number) => <SkeletonPage key={index} />)}


        {isSuccess &&
          data?.results.map((item: SellerResults) => (
            <Link href={`/seller-details/${item.id}`}>
              <SellerCard
                key={item.id}
                id={item.id}
                image={item?.image}
                phone={item.phone}
                full_name={item.full_name}
                seller_coins={[]}
              />
            </Link>
          ))
        }
      </div>
      {pageCount > 0 && <PaginationPage
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        currentPage={currentPage}
        totalPages={pageCount}
        handlePageClick={handlePageClick}
      />}

    </div>
  );
};

export default SellerComponent;
