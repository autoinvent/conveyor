import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import { Lenses, Lens } from '@/Lenses';
import {
  useModelIndex,
  nextSort,
  getCurrentSortDirection,
  SortDirection,
} from '@/ModelIndex';
import { humanizeText } from '@/utils';
import type { TableView } from '@/types';

export const ModelIndexTableHeaderCellDefaultContent = ({
  fieldName,
}: { fieldName: string }) => {
  const { selected } = useModelIndex((state) => ({
    sort: state.tableView?.sort ?? [],
    setTableView: state.setTableView,
  }));
  const currSortDirection = getCurrentSortDirection(selected.sort, fieldName);
  const onNextSort = () =>
    selected.setTableView((state: TableView) => {
      return {
        ...state,
        sort: nextSort(selected.sort, fieldName),
      };
    });
  return (
    <>
      {humanizeText(fieldName)}
      <span className="float-right py-1">
        <Lenses activeLens={currSortDirection}>
          <Lens lens={SortDirection.ASC}>
            <FaSortUp onClick={onNextSort} />
          </Lens>
          <Lens lens={SortDirection.DESC}>
            <FaSortDown onClick={onNextSort} />
          </Lens>
          <Lens lens={SortDirection.NONE}>
            <FaSort onClick={onNextSort} />
          </Lens>
        </Lenses>
      </span>
    </>
  );
};
