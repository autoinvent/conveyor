import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

import { Lenses, Lens } from '@/Lenses';
import { SortDirection } from '@/hooks';
import { humanizeText } from '@/utils';

import { useModelIndex } from './useModelIndex';

export const ModelIndexTableHeaderCellDefaultContent = ({
  field,
}: { field: string }) => {
  const { selected } = useModelIndex((state) => ({
    nextSort: state.nextSort,
    getCurrentSort: state.getCurrentSort,
  }));
  const currSort = selected.getCurrentSort?.(field) ?? SortDirection.NONE;
  const onNextSort = () => selected.nextSort?.(field);
  return (
    <>
      {humanizeText(field)}
      <span className="float-right">
        <Lenses activeLens={currSort}>
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
