import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

import useTableView from '../../hooks/useTableView'
import { PACKAGE_ABBR } from '../../package'
import {
  DEFAULT_TABLE_VIEW,
  TableViewsAction,
} from '../../reducers/tableViewsReducer'
import { BaseProps } from '../../types'

interface ModelTablePaginationProps extends BaseProps {
  modelName: string
  modelListCount: number
  pageLimit?: number // The max number of page btns to show at a time
}

const ModelTablePagination = ({
  id,
  className = `${PACKAGE_ABBR}-table-pagination`,
  modelName,
  modelListCount = 0,
  pageLimit = 10,
}: ModelTablePaginationProps) => {
  const { tableView, dispatch } = useTableView({ modelName })
  const { current, per_page } = tableView?.page ?? DEFAULT_TABLE_VIEW.page
  const totalPages = Math.ceil(modelListCount / per_page)
  const currentPageSet = Math.ceil(current / pageLimit)
  const numPageBtnShown =
    currentPageSet * pageLimit > totalPages ? totalPages % pageLimit : pageLimit
  const btns = []

  if (currentPageSet > 1) {
    btns.push(
      <button
        key={`${PACKAGE_ABBR}-table-pagination-left-arrow`}
        onClick={() => {
          dispatch({
            type: TableViewsAction.SET_PAGE,
            payload: { modelName, current: (currentPageSet - 1) * pageLimit },
          })
        }}
      >
        <FaChevronLeft />
      </button>
    )
  }
  for (let i = 0; i < numPageBtnShown; i++) {
    const pageNum = (currentPageSet - 1) * pageLimit + i + 1
    btns.push(
      <button
        key={`${PACKAGE_ABBR}-table-pagination-${pageNum}`}
        className={
          current === pageNum
            ? `${PACKAGE_ABBR}-table-pagination-active-page`
            : ''
        }
        onClick={() => {
          dispatch({
            type: TableViewsAction.SET_PAGE,
            payload: { modelName, current: pageNum },
          })
        }}
      >
        {pageNum}
      </button>
    )
  }
  if (currentPageSet * pageLimit < totalPages) {
    btns.push(
      <button key={`${PACKAGE_ABBR}-table-pagination-goto`} disabled>
        ...
      </button>
    )
  }
  if (currentPageSet * pageLimit < totalPages) {
    btns.push(
      <button
        key={`${PACKAGE_ABBR}-table-pagination-right-arrow`}
        onClick={() => {
          dispatch({
            type: TableViewsAction.SET_PAGE,
            payload: { modelName, current: currentPageSet * pageLimit + 1 },
          })
        }}
      >
        <FaChevronRight />
      </button>
    )
  }
  btns.push()
  return (
    <div id={id} className={className}>
      <span>{btns}</span>
      <span>
        {modelListCount
          ? `${per_page * (current - 1) + 1}-${
              totalPages === current ? modelListCount : per_page * current
            } of ${modelListCount}`
          : null}
      </span>
    </div>
  )
}

export default ModelTablePagination
