import { useState } from 'react';

import type { TableView } from '@/types';

export interface TableViewOptions {
  tableView: TableView;
  onTableViewChange: (changedTableView: Partial<TableView>) => void;
}

export const useTableView = (
  initialTableView: TableView = {},
): TableViewOptions => {
  const [tableView, setTableView] = useState(initialTableView);
  const onTableViewChange = (changedTableView: Partial<TableView>) => {
    setTableView((oldTableView) =>
      Object.assign({}, oldTableView, changedTableView),
    );
  };

  return { tableView, onTableViewChange };
};
