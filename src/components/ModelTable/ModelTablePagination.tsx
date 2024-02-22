import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import { useTableView } from '../../hooks/useTableView';
import { PACKAGE_ABBR } from '../../package';
import {
  DEFAULT_TABLE_VIEW,
  TableViewsAction,
} from '../../reducers/tableViewsReducer';
import { BaseProps } from '../../types';
import { Pagination } from 'react-bootstrap';
import { useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch({
      type: TableViewsAction.SET_PAGE,
      payload: { modelName, page: pageNumber },
    });
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePaginationClick(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }
    return items;
  };

  return (
    <div id={id} className={className}>
      <Pagination>
        {renderPaginationItems()}
        <span className='pagination-info'>
          {modelListTotal
            ? `${per_page * (page - 1) + 1}-${
                totalPages === page ? modelListTotal : per_page * page
              } of ${modelListTotal}`
            : null}
        </span>
      </Pagination>
    </div>
  );
};

export default ModelTablePagination;
