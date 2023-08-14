import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import { useTableView } from "../../hooks/useTableView";
import { PACKAGE_ABBR } from "../../package";
import {
  DEFAULT_TABLE_VIEW,
  TableViewsAction,
} from "../../reducers/tableViewsReducer";
import { BaseProps } from "../../types";

interface ModelTablePaginationProps extends BaseProps {
  modelName: string;
  modelListTotal?: number;
  pageLimit?: number; // The max number of page btns to show at a time
}

const ModelTablePagination = ({
  id,
  className = `${PACKAGE_ABBR}-table-pagination`,
  modelName,
  modelListTotal = 0,
  pageLimit = 10,
}: ModelTablePaginationProps) => {
  const { tableView, dispatch } = useTableView({ modelName });
  const page = tableView?.page ?? DEFAULT_TABLE_VIEW.page;
  const per_page = tableView?.per_page ?? DEFAULT_TABLE_VIEW.per_page;
  const totalPages = Math.ceil(modelListTotal / per_page);
  const currentPageSet = Math.ceil(page / pageLimit);
  const numPageBtnShown =
    currentPageSet * pageLimit > totalPages
      ? totalPages % pageLimit
      : pageLimit;
  const btns = [];

  if (currentPageSet > 1) {
    btns.push(
      <button
        key={`${PACKAGE_ABBR}-table-pagination-left-arrow`}
        onClick={() => {
          dispatch({
            type: TableViewsAction.SET_PAGE,
            payload: { modelName, page: (currentPageSet - 1) * pageLimit },
          });
        }}
      >
        <FaChevronLeft />
      </button>
    );
  }
  for (let i = 0; i < numPageBtnShown; i++) {
    const pageNum = (currentPageSet - 1) * pageLimit + i + 1;
    btns.push(
      <button
        key={`${PACKAGE_ABBR}-table-pagination-${pageNum}`}
        className={
          page === pageNum ? `${PACKAGE_ABBR}-table-pagination-active-page` : ""
        }
        onClick={() => {
          dispatch({
            type: TableViewsAction.SET_PAGE,
            payload: { modelName, page: pageNum },
          });
        }}
      >
        {pageNum}
      </button>
    );
  }
  if (currentPageSet * pageLimit < totalPages) {
    btns.push(
      <button key={`${PACKAGE_ABBR}-table-pagination-goto`} disabled>
        ...
      </button>
    );
  }
  if (currentPageSet * pageLimit < totalPages) {
    btns.push(
      <button
        key={`${PACKAGE_ABBR}-table-pagination-right-arrow`}
        onClick={() => {
          dispatch({
            type: TableViewsAction.SET_PAGE,
            payload: { modelName, page: currentPageSet * pageLimit + 1 },
          });
        }}
      >
        <FaChevronRight />
      </button>
    );
  }
  btns.push();
  return (
    <div id={id} className={className}>
      <span>{btns}</span>
      <span>
        {modelListTotal
          ? `${per_page * (page - 1) + 1}-${
              totalPages === page ? modelListTotal : per_page * page
            } of ${modelListTotal}`
          : null}
      </span>
    </div>
  );
};

export default ModelTablePagination;
