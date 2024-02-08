import { ErrorMessage } from '../enums';
import { ReducerAction } from '../types';

export type TableViewSort = string[];
export interface TableViewFilter {
  fieldName: string;
  operator: string;
  value: any;
  not: any;
}
export interface TableViewFilterGroup {
  filters: TableViewFilter[];
}
export interface TableView {
  page?: number;
  per_page?: number;
  sort?: TableViewSort;
  filter?: TableViewFilter;
}
export type TableViews = Record<string, TableView>;
export enum TableViewsAction {
  INIT = 'INIT',
  NEXT_SORT = 'NEXT_SORT',
  SET_PAGE = 'SET_PAGE',
  ADD_FILTER = 'ADD_FILTER',
  REMOVE_FILTER = 'REMOVE_FILTER',
  CLEAR_SORTS = 'CLEAR_SORTS',
}

export const DEFAULT_TABLE_VIEW = {
  page: 1,
  per_page: 5,
  sort: [],
  filter: {},
};

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

export const getSortDir = (sort: TableViewSort, field: string) => {
  const fieldSort = sort.find((sort) => sort.endsWith(field));
  if (!fieldSort) return SortDirection.NONE;
  else if (fieldSort.startsWith('-')) return SortDirection.DESC;
  else return SortDirection.ASC;
};

export const tableViewsReducer = (
  tableViews: TableViews,
  action: ReducerAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case TableViewsAction.INIT: {
      const { modelName, tableView } = payload;
      if (!tableViews[modelName]) {
        tableViews[modelName] = tableView;
      }
      return tableViews;
    }
    case TableViewsAction.NEXT_SORT: {
      const { modelName, fieldName } = payload;
      const newTableViews = { ...tableViews };
      if (!newTableViews[modelName]) newTableViews[modelName] = {};
      if (!newTableViews[modelName].sort) newTableViews[modelName].sort = [];
      const newSort = newTableViews[modelName].sort ?? [];
      const dir = getSortDir(newSort, fieldName);

      const sortFieldIdx = newSort.findIndex((field) =>
        field.endsWith(fieldName),
      );
      switch (dir) {
        case SortDirection.ASC: {
          newSort[sortFieldIdx] = `-${fieldName}`;
          break;
        }
        case SortDirection.DESC: {
          newSort.splice(sortFieldIdx, 1);
          break;
        }
        case SortDirection.NONE: {
          newSort.push(fieldName);
          break;
        }
      }
      newTableViews[modelName].sort = newSort;
      return newTableViews;
    }
    case TableViewsAction.CLEAR_SORTS: {
      const { modelName } = payload;
      const newTableViews = { ...tableViews };
      if (!newTableViews[modelName]) newTableViews[modelName] = {};
      newTableViews[modelName].sort = [];
      return newTableViews;
    }
    case TableViewsAction.SET_PAGE: {
      const { modelName, page } = payload;
      if (page <= 0) return tableViews;
      const newTableViews = { ...tableViews };
      if (!newTableViews[modelName]) newTableViews[modelName] = {};
      newTableViews[modelName].page = page;
      return newTableViews;
    }
    case TableViewsAction.ADD_FILTER: {
      const { modelName, filters } = payload;
      const newTableViews = { ...tableViews };
      if (!newTableViews[modelName]) {
        newTableViews[modelName] = {};
      }
      newTableViews[modelName].filter = filters; // Assuming filters is an array of TableViewFilter objects
      return newTableViews;
    }
    case TableViewsAction.REMOVE_FILTER: {
      const { modelName } = payload;
      const newTableViews = { ...tableViews };
      // rome-ignore lint/performance/noDelete: <explanation>
      delete newTableViews[modelName]?.filter;
      return newTableViews;
    }

    default: {
      throw Error(`${ErrorMessage.REDUCER_ACTION_DNE} ${type}`);
    }
  }
};
