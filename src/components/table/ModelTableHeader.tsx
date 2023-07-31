import { memo, FC } from 'react'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'

import useTableView from '../../hooks/useTableView'
import { PACKAGE_ABBR } from '../../package'
import { SortDir, TableViewsAction } from '../../reducers/tableViewsReducer'
import { BaseProps } from '../../types'
import { humanizeText } from '../../utils/common'

interface ModelTableHeaderProps extends BaseProps {
  modelName: string
  field: string
  displayLabelFn?: () => any
  sortable?: boolean
}

const ModelTableHeader: FC<ModelTableHeaderProps> = ({
  id,
  className,
  modelName,
  field,
  displayLabelFn = humanizeText,
  sortable,
}) => {
  const { tableView, dispatch } = useTableView({ modelName })
  const fieldSort = tableView?.sort?.find((sort) => sort.startsWith(field))
  const dir = fieldSort?.slice(field.length) ?? ''
  const getSortDisplay = (dir: string) => {
    switch (dir) {
      case SortDir.ASC:
        return <FaSortUp className={`${PACKAGE_ABBR}-sort-up`} />
      case SortDir.DESC:
        return <FaSortDown className={`${PACKAGE_ABBR}-sort-down`} />
      default:
        return <FaSort className={`${PACKAGE_ABBR}-sort-none`} />
    }
  }
  const handleSort = () => {
    if (sortable) {
      dispatch({
        type: TableViewsAction.NEXT_SORT,
        payload: { modelName, fieldName: field },
      })
    }
  }
  return (
    <th id={id} className={className} onClick={handleSort}>
      {displayLabelFn(field)}
      {sortable && (
        <span className={`float-right ${PACKAGE_ABBR}-sort `}>
          {getSortDisplay(dir)}
        </span>
      )}
    </th>
  )
}

export default memo(ModelTableHeader) as FC<ModelTableHeaderProps>
