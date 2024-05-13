import { Dispatch, SetStateAction } from 'react';

import { TableView } from '@/types';

export const setPage = (
  setTableView: Dispatch<SetStateAction<TableView>>,
  newPage: number,
) => {
  setTableView((state) => {
    return {
      ...state,
      page: newPage,
    };
  });
};

export const setItemsPerPage = (
  setTableView: Dispatch<SetStateAction<TableView>>,
  newPerPage: number,
) => {
  setTableView((state) => {
    return {
      ...state,
      per_page: newPerPage,
    };
  });
};
