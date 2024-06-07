import { produce } from 'immer';
import { useCallback, useState } from 'react';

import type { TableView, TableViewFilter } from '@/types';
import type { SortDirection } from '@/types';

import * as Filter from '@/utils/filter';
import * as Sort from '@/utils/sort';

export interface UseTableViewOptions {
  sortSequence: SortDirection[];
}

export const useTableView = (
  initialTableView: TableView,
  options: UseTableViewOptions,
) => {
  const [tableView, setTableView] = useState(initialTableView);
  // Filters
  const addFilter = useCallback(
    (filter: TableViewFilter, filterGroup: number) => {
      setTableView((tv) =>
        produce(tv, (draft) => {
          draft.filter = Filter.addFilter(draft.filter, filter, filterGroup);
        }),
      );
    },
    [],
  );
  const removeFilter = useCallback(
    (filterGroup: number, filterGroupIndex: number) => {
      setTableView((tv) =>
        produce(tv, (draft) => {
          draft.filter = Filter.removeFilter(
            draft.filter,
            filterGroup,
            filterGroupIndex,
          );
        }),
      );
    },
    [],
  );
  const swapFilter = useCallback(
    (
      filterGroup1: number,
      filterGroupIndex1: number,
      filterGroup2: number,
      filterGroupIndex2: number,
    ) => {
      setTableView((tv) =>
        produce(tv, (draft) => {
          draft.filter = Filter.swapFilter(
            draft.filter,
            filterGroup1,
            filterGroupIndex1,
            filterGroup2,
            filterGroupIndex2,
          );
        }),
      );
    },
    [],
  );

  // Pagination
  const setPage = useCallback((newPage: number) => {
    setTableView((tv) =>
      produce(tv, (draft) => {
        draft.page = newPage;
      }),
    );
  }, []);
  const setItemsPerPage = useCallback((newPerPage: number) => {
    setTableView((tv) =>
      produce(tv, (draft) => {
        draft.per_page = newPerPage;
      }),
    );
  }, []);
  // Sort
  const getCurrentSortDirection = useCallback(
    (field: string) => {
      return Sort.getCurrentSortDirection(tableView.sort, field);
    },
    [tableView.sort],
  );
  const nextSort = useCallback(
    (field: string, sortSequence: SortDirection[]) => {
      setTableView((tv) =>
        produce(tv, (draft) => {
          draft.sort = Sort.nextSort(draft.sort, field, sortSequence);
        }),
      );
    },
    [],
  );
  const swapSort = useCallback((index1: number, index2: number) => {
    setTableView((tv) =>
      produce(tv, (draft) => {
        draft.sort = Sort.swapSort(draft.sort, index1, index2);
      }),
    );
  }, []);

  return {
    tableView,
    setTableView,
    addFilter,
    removeFilter,
    swapFilter,
    setPage,
    setItemsPerPage,
    getCurrentSortDirection,
    nextSort,
    swapSort,
  };
};
