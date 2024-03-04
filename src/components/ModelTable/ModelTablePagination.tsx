import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Select from 'react-select';
import { useTableView } from '../../hooks/useTableView';
import { PACKAGE_ABBR } from '../../package';
import {
  DEFAULT_TABLE_VIEW,
  TableViewsAction,
} from '../../reducers/tableViewsReducer';
import { BaseProps } from '../../types';
import { Pagination } from 'react-bootstrap';
import { useEffect, useState } from 'react';

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
  const per_page_default = tableView?.per_page ?? DEFAULT_TABLE_VIEW.per_page;
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(per_page_default); // Default per page value

  useEffect(() => {
    setCurrentPage(1);
    setPerPage(per_page_default);
  }, [modelName]);

  let totalPages = Math.ceil(modelListTotal / perPage);
  const currentPageSet = Math.ceil(currentPage / pageLimit);

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
    setCurrentPage(1);
    dispatch({
      type: TableViewsAction.SET_PAGE,
      payload: { modelName, page: 1 },
    });
    dispatch({
      type: TableViewsAction.SET_PER_PAGE,
      payload: { modelName, perPage: perPage },
    });
  };

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    totalPages = Math.ceil(modelListTotal / perPage);
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
          style={{ display: 'inline-block' }}
        >
          {i}
        </Pagination.Item>,
      );
    }
    return items;
  };

  const options = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    /* Add more options as needed */
  ];

  return (
    <>
      <div
        id={id}
        className={className}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <Pagination style={{ display: 'inline-block' }}>
            {renderPaginationItems()}
          </Pagination>
          <span className='pagination-info'>
            {modelListTotal
              ? `${perPage * (page - 1) + 1}-${
                  totalPages === page ? modelListTotal : perPage * page
                } of ${modelListTotal}`
              : null}
          </span>
        </div>
        <div style={{ display: 'flex' }}>
          <span className='pagination-info'>Per Page:</span>
          <Select
            value={{ value: perPage.toString(), label: perPage.toString() }}
            onChange={(selectedOption: any) =>
              handlePerPageChange(Number(selectedOption.value))
            }
            placeholder={per_page_default.toString()}
            className={`page ${className ?? ''}`}
            classNamePrefix='page'
            options={options}
          />
        </div>
      </div>
    </>
  );
};

export default ModelTablePagination;
