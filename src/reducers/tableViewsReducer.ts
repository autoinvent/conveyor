import { ErrorMessage } from "../enums";
import { ReducerAction } from "../types";

export interface TableViewPage {
  current: number;
  per_page: number;
}
export type TableViewSort = string[];
export interface TableViewFilter {
  [fieldName: string]: {
    operator: string;
    value?: any;
  };
}
export interface TableView {
  page?: TableViewPage;
  sort?: TableViewSort;
  filter?: TableViewFilter;
}
export type TableViews = Record<string, TableView>;
export enum TableViewsAction {
  INIT = "INIT",
  NEXT_SORT = "NEXT_SORT",
  SET_PAGE = "SET_PAGE",
}
export enum SortDir {
  ASC = "_asc",
  DESC = "_desc",
}

export const DEFAULT_TABLE_VIEW = {
  page: {
    current: 1,
    per_page: 20,
  },
  sort: [],
  filter: {},
};

const tableViewsReducer = (tableViews: TableViews, action: ReducerAction) => {
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
      newTableViews[modelName] = newTableViews[modelName]
        ? { ...newTableViews[modelName] }
        : {};
      newTableViews[modelName].sort = newTableViews[modelName].sort
        ? [...(newTableViews[modelName].sort as TableViewSort)]
        : [];

      const sort = newTableViews[modelName].sort as TableViewSort;
      const sortIdx = sort.findIndex((field) => field.startsWith(fieldName));
      const nextDirection = {
        [SortDir.ASC]: SortDir.DESC,
        [SortDir.DESC]: null,
        false: SortDir.ASC,
      };
      const currDir = sortIdx >= 0 && sort?.[sortIdx]?.slice(fieldName.length);
      const nextDir = nextDirection[currDir as SortDir];
      const newFieldSort = `${fieldName}${nextDir}`;
      if (sortIdx >= 0) {
        if (nextDir) sort[sortIdx] = newFieldSort;
        else sort.splice(sortIdx, 1);
        newTableViews[modelName].sort = sort;
      } else {
        newTableViews[modelName].sort?.push(newFieldSort);
      }
      return newTableViews;
    }
    case TableViewsAction.SET_PAGE: {
      const { modelName, current } = payload;
      if (current <= 0) return tableViews;
      const newTableViews = { ...tableViews };
      newTableViews[modelName] = tableViews[modelName]
        ? { ...tableViews[modelName] }
        : {};
      newTableViews[modelName].page = {
        current: current,
        per_page:
          newTableViews[modelName].page?.per_page ??
          DEFAULT_TABLE_VIEW.page.per_page,
      };
      return newTableViews;
    }
    default: {
      throw Error(`${ErrorMessage.REDUCER_ACTION_DNE} ${type}`);
    }
  }
};

export default tableViewsReducer;
