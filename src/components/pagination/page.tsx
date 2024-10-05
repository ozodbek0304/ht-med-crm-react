import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

type Props = {
    handleNext: () => void;  // Keyingi sahifaga o'tish funksiyasi
    handlePrevious: () => void;  // Oldingi sahifaga o'tish funksiyasi
    handlePageClick: (pageNumber: number) => void;   // Sаahifaga o'tish funksiyasi
    currentPage: number;
    totalPages: number;
};


const PaginationPage = ({ handleNext, handlePrevious, handlePageClick, currentPage, totalPages }: Props) => {

    // Sahifalarni yaratish logikasi
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Ko'rinadigan sahifalar soni

        if (totalPages <= maxVisiblePages) {
            // Agar umumiy sahifalar soni ko'p bo'lmasa, barcha sahifalarni ko'rsatamiz
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Boshida va oxirida ellipsis qo'shish logikasi
            if (currentPage <= 3) {
                // Birinchi 3 sahifa ko'rinib tursin
                pages.push(1, 2, 3, 4, 5);
            } else if (currentPage >= totalPages - 2) {
                // Oxirgi 3 sahifa ko'rinib tursin
                pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // O'rtadagi sahifalar ko'rinib tursin
                pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2);
            }
        }
        return pages;
    };

    return (
        <Pagination className="flex justify-start w-full">
            <PaginationContent>

                {/* Oldingi sahifaga o'tish */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={handlePrevious}
                        // disabled={currentPage === 1}
                        className={`cursor-pointer ${currentPage === 1 ? 'opacity-50' : ''}`}
                    />
                </PaginationItem>

                {/* Sahifa raqamlari */}
                {currentPage > 3 && (
                    <>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => handlePageClick(1)}>1</PaginationLink>
                        </PaginationItem>
                        {currentPage > 4 && <PaginationEllipsis />}
                    </>
                )}

                {/* Ko'rinadigan sahifalar */}
                {getPageNumbers().map((pageNumber: number) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            isActive={currentPage === pageNumber}
                            href="#"
                            onClick={() => handlePageClick(pageNumber)}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Oxirgi ellipsis va sahifa */}
                {currentPage < totalPages - 2 && (
                    <>
                        {currentPage < totalPages - 3 && <PaginationEllipsis />}
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => handlePageClick(totalPages)}>{totalPages}</PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/* Keyingi sahifaga o'tish */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={handleNext}
                        // disabled={currentPage === totalPages}
                        className={`cursor-pointer ${currentPage === totalPages ? 'opacity-50' : ''}`}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    );
};

export default PaginationPage;
