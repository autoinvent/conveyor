import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import { useModelIndex, setPage } from '@/ModelIndex';
import { useEffect } from 'react';
import type { TableView } from '@/types';

export interface ModelIndexPaginationProps {
  pageLimit?: number; // The max number of page btns to show at a time
}

export const ModelIndexPagination = ({
  pageLimit = 10,
}: ModelIndexPaginationProps) => {
  const {
    selected: { totalDataLength, page, per_page, setTableView },
  } = useModelIndex((state) => ({
    totalDataLength: state.totalDataLength,
    page: state.tableView?.page,
    per_page: state.tableView?.per_page,
    setTableView: state.setTableView,
  }));

  const totalPages = Math.ceil(totalDataLength / per_page);
  const currentPageSet = Math.ceil(page / pageLimit);
  const numPageBtnShown =
    currentPageSet * pageLimit > totalPages
      ? totalPages % pageLimit
      : pageLimit;
  const btns = [];

  if (currentPageSet > 1) {
    btns.push(
      <button
        key={`table-pagination-left-arrow`}
        type="button"
        onClick={() => {
          setPage(setTableView, (currentPageSet - 1) * pageLimit);
        }}
      >
        <FaChevronLeft className="h-8 w-4" />
      </button>,
    );
  }
  for (let i = 0; i < numPageBtnShown; i++) {
    const pageNum = (currentPageSet - 1) * pageLimit + i + 1;
    btns.push(
      <button
        key={`table-pagination-${pageNum}`}
        type="button"
        className={`min-w-8 w-8 px-1.5 whitespace-nowrap hover:bg-[--border-color] rounded-md m-[2px] ${
          page === pageNum
            ? 'bg-[--success] border-[--success] hover:bg-[--success-dark] hover:border-[--success-dark]'
            : ''
        }`}
        onClick={() => {
          setPage(setTableView, pageNum);
        }}
      >
        {pageNum}
      </button>,
    );
  }
  if (currentPageSet * pageLimit < totalPages) {
    btns.push(
      <button key={`table-pagination-goto`} type="button" disabled>
        ...
      </button>,
    );
  }
  if (currentPageSet * pageLimit < totalPages) {
    btns.push(
      <button
        key={`table-pagination-right-arrow`}
        type="button"
        onClick={() => {
          setPage(setTableView, currentPageSet * pageLimit + 1);
        }}
      >
        <FaChevronRight className="h-8 w-4" />
      </button>,
    );
  }
  btns.push();

  useEffect(() => {
    if (!per_page) {
      setTableView((state: TableView) => {
        return {
          ...state,
          per_page: 5,
        };
      });
    }
    if (!page) {
      setTableView((state: TableView) => {
        return {
          ...state,
          page: 1,
        };
      });
    }
  }, [per_page, page]);

  return per_page && page ? (
    <div className="text-left	 w-full">
      <span aria-label="pagination" className={'justify-center'}>
        {btns}
      </span>
      <span>
        {totalDataLength
          ? ` Showing items ${per_page * (page - 1) + 1}-${
              totalPages === page ? totalDataLength : per_page * page
            } of ${totalDataLength}`
          : null}
      </span>
    </div>
  ) : null;
};
