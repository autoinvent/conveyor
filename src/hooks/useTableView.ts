import { useContext, useEffect } from "react";

import {
  TableViewsContext,
  TableViewsDispatchContext,
} from "../contexts/TableViewsContext";
import { TableViewsAction, TableView } from "../reducers/tableViewsReducer";

interface UseTableViewProps {
  modelName: string;
  tableViewInit?: TableView;
}
const useTableView = ({ modelName, tableViewInit }: UseTableViewProps) => {
  const tableViews = useContext(TableViewsContext);
  const dispatch = useContext(TableViewsDispatchContext);

  // Set up initial tableView for the current modelName
  useEffect(() => {
    if (tableViewInit) {
      dispatch({
        type: TableViewsAction.INIT,
        payload: { modelName, tableView: tableViewInit },
      });
    }
  }, [modelName, tableViewInit]);
  return { tableView: tableViews[modelName], dispatch };
};

export default useTableView;
