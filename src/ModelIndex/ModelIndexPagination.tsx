import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const ModelIndexPagination = ({ modelListTotal=487, pageLimit = 20}) => {
  const totalPages = Math.ceil(modelListTotal / pageLimit);
  const [currentPage, setCurrentPage] = React.useState(1);

  function handlePrevious() {
    setCurrentPage((prevPage) => Math.max(prevPage - 10, 1));
  }

  function handleNext() {
    setCurrentPage((prevPage) => Math.min(prevPage + 10, totalPages));
  }

  const PageGenerator = () => {
    const pages = [];

    // Calculate the range of pages to display
    let startPage = Math.max(currentPage - 4, 1); // Start page is the current page minus 4, but at least 1
    let endPage = Math.min(startPage + 9, totalPages); // End page is the start page plus 9, but at most totalPages

    // Adjust startPage if there are fewer than 10 pages after current page
    if (endPage - startPage < 9) {
      startPage = Math.max(endPage - 9, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={twMerge('min-w-8 w-8 px-1.5 whitespace-nowrap hover:bg-[--border-color] rounded-md m-[2px]', currentPage === i ? 'bg-[--success] border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark]' : '')}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const PaginationInfo = modelListTotal ? `${pageLimit * (currentPage - 1) + 1}-${
    totalPages === currentPage ? modelListTotal : pageLimit * currentPage
  } of ${modelListTotal}` : null;

  return (
    <div className="justify-center w-full">
    {/*Pagination*/}
    <nav role="navigation" aria-label="pagination" className={'justify-center w-full flex whitespace-nowrap'}>
      {/* PaginationPrevious */}
      <div className={"flex my-1 cursor-pointer"} onClick={handlePrevious}>
        <ChevronLeft className="h-8 w-4" />
        <ChevronLeft className="h-8 w-4" />
      </div>
      {/* Pages */}
      {PageGenerator()}
      {/* PaginationNext */}
      <div className={"flex my-1 cursor-pointer"} onClick={handleNext}>
        <ChevronRight className="h-8 w-4" />
        <ChevronRight className="h-8 w-4" />
      </div>
    </nav>
    Showing Items {PaginationInfo}
    </div>
  );
};
