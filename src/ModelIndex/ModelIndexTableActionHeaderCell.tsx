import { FaPlus } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

import { TableHeaderCell, TableHeaderCellProps } from '@/Table';

import { useModelIndex } from './useModelIndex';
import { ACTION_SLOT } from './constants';

export interface ModelIndexTableActionHeaderCellProps
  extends Omit<TableHeaderCellProps, 'columnId'> {}

export const ModelIndexTableActionHeaderCell = ({
  children,
  className,
  ...props
}: ModelIndexTableActionHeaderCellProps) => {
  const { selected } = useModelIndex((state) => state.onCreate);
  return (
    <TableHeaderCell columnId={ACTION_SLOT} {...props}>
      {children === undefined ? (
        <button onClick={() => selected?.()}>
          <FaPlus />
        </button>
      ) : (
        children
      )}
    </TableHeaderCell>
  );
};
