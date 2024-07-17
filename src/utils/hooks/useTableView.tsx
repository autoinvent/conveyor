import { type Dispatch, type SetStateAction, useState } from 'react';

import type { TableView } from '@/types';

export interface TableViewOptions {
  tableView: TableView;
  onTableViewChange: Dispatch<SetStateAction<TableView>>;
}

export const useTableView = (
  initialTableView: TableView = {},
): TableViewOptions => {
  const [tableView, setTableView] = useState(initialTableView);
  const onTableViewChange: Dispatch<SetStateAction<TableView>> = (
    changedTableView,
  ) => {
    if (typeof changedTableView === 'function') {
      setTableView(changedTableView);
    } else {
      setTableView((oldTableView) =>
        Object.assign({}, oldTableView, changedTableView),
      );
    }
  };

  return { tableView, onTableViewChange };
};
