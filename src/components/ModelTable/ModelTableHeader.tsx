import { memo, FC } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import { useTableView } from '../../hooks/useTableView';
import { PACKAGE_ABBR } from '../../package';
import {
  TableViewsAction,
  getSortDir,
  SortDirection,
} from '../../reducers/tableViewsReducer';
import { BaseProps } from '../../types';
import { humanizeText } from '../../utils/common';

interface ModelTableHeaderProps extends BaseProps {
  modelName: string;
  field: string;
  displayLabelFn?: () => any;
  sortable?: boolean;
  sorts: any[];
  setSorts: any;
}

const ModelTableHeader: FC<ModelTableHeaderProps> = ({
  id,
  className,
  modelName,
  field,
  displayLabelFn = humanizeText,
  sortable,
  sorts,
  setSorts,
}) => {
  const { tableView, dispatch } = useTableView({ modelName });
  const sortDir = getSortDir(tableView?.sort ?? [], field);
  let sortDisplay;
  switch (sortDir) {
    case SortDirection.ASC: {
      sortDisplay = <FaSortUp className={`${PACKAGE_ABBR}-sort-up`} />;
      break;
    }
    case SortDirection.DESC: {
      sortDisplay = <FaSortDown className={`${PACKAGE_ABBR}-sort-down`} />;
      break;
    }
    case SortDirection.NONE: {
      sortDisplay = <FaSort className={`${PACKAGE_ABBR}-sort-none`} />;
      break;
    }
  }

  const handleSort = () => {
    if (sortable) {
      dispatch({
        type: TableViewsAction.NEXT_SORT,
        payload: { modelName, fieldName: field },
      });
      setSorts(() => [...sorts, { direction: sortDir, field }]);
    }
  };
  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: TODO?
    <th id={id} className={className} onClick={handleSort}>
      {displayLabelFn(field)}
      {sortable && (
        <span className={`float-right ${PACKAGE_ABBR}-sort `}>
          {sortDisplay}
        </span>
      )}
    </th>
  );
};

export default memo(ModelTableHeader) as FC<ModelTableHeaderProps>;
