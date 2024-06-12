import { useState } from 'react';

import type { TableView } from '@/types';

export const useTableView = (initialTableView: TableView = {}) => {
  const [tableView, setTableView] = useState(initialTableView);
  const onTableViewChange = (changedTableView: Partial<TableView>) => {
    setTableView((oldTableView) =>
      Object.assign({}, oldTableView, changedTableView),
    );
  };

  return { tableView, onTableViewChange };
};
