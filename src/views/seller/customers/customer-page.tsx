import CustomerFilters from "./custom-filters";
import { useAuth } from "../../../store";
import SkeletonPage from "../../../components/skeleton/skeleton-page";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import PaginationPage from "../../../components/pagination/page";
import { useState } from "react";
import { useCustomerStore } from "../../../store/customerStore";
import { useParams } from "next/navigation";
import { useGetItemsDetailsSellerQuery } from "../../../features/seller-dashboard/seller-dashboard";
import { Card, CardContent } from "../../../components/ui/card";
import ProjectGrid from "../../../components/customer-card/project-grid";
import { Result } from "../../../interfaces/customer";





const SellerCustomersPages = () => {
  const { id } = useParams()
  const { queryParam, setQueryParam } = useCustomerStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryStr = new URLSearchParams({ ...(queryParam as Record<string, string>) }).toString();

  const { data, error, isLoading, isSuccess, isError } = useGetItemsDetailsSellerQuery({ id: String(id), queryParams: queryStr });

  const { user } = useAuth((state) => state);
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




  console.log(id);


  return (
    <div className="space-y-4">

      <Card>
        <CardContent className="p-4 space-y-4 mt-4">
          <CustomerFilters />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 space-y-4 mt-3 dark:bg-slate-900 dark:p-0">


          <div className="grid  lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-5">

            {isLoading &&
              Array(9)
                .fill(0)
                .map((_, index: number) => <SkeletonPage key={index} />)}

            {isSuccess && data?.results?.length > 0 &&
              data?.results?.map((project: Result, i: number) => (
                <ProjectGrid
                  project={project}
                  key={`project-grid-${i}`}
                  role={user.role}
                />
              ))}
          </div>


          {
            (isSuccess && data.count == 0) && <Alert className="w-full " variant={"outline"} color="warning">
              <AlertDescription className="w-full text-center">Ma'lumot topilmadi</AlertDescription>
            </Alert>
          }


          {
            isError && <Alert className="w-full " variant={"outline"} color="destructive">
              <AlertDescription className="w-full text-center">Status: {(error as any)?.originalStatus}, Xatolik yuz berdi</AlertDescription>
            </Alert>
          }

          {pageCount > 1 && <PaginationPage
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            currentPage={currentPage}
            totalPages={pageCount}
            handlePageClick={handlePageClick}
          />}

        </CardContent>
      </Card>

    </div>
  );
};

export default SellerCustomersPages;
