import { useContext, useEffect } from 'react';

import {
  TableViewsContext,
  TableViewsDispatchContext,
} from '../contexts/TableViewsContext';
import { TableViewsAction, TableView } from '../reducers/tableViewsReducer';

interface UseTableViewProps {
  modelName: string;
  tableView?: TableView;
}
export const useTableView = ({ modelName, tableView }: UseTableViewProps) => {
  const tableViews = useContext(TableViewsContext);
  const dispatch = useContext(TableViewsDispatchContext);
  // Set up initial tableView for the current modelName
  useEffect(() => {
    if (!tableViews[modelName]) {
      dispatch({
        type: TableViewsAction.INIT,
        payload: { modelName, tableView },
      });
    }
  }, [modelName, tableView]);
  return { tableView: tableViews[modelName], dispatch };
};
