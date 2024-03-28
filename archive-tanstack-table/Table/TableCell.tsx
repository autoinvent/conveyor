import { useEffect } from 'react';

import { CommonProps, WrapperProp } from '@/types';

import { useTable } from './useTable';

export interface TableCellProps extends WrapperProp, CommonProps {
  columnId: string;
}

export const TableCell = ({
  columnId,
  children,
  id,
  className,
  style,
}: TableCellProps) => {
  const { options } = useTable();
  const columnIndex = options.columns.findIndex(
    (columnDef) => columnDef.id === columnId,
  );
  useEffect(() => {
    if (columnIndex !== -1 && options.columns[columnIndex].cell === undefined) {
      options.meta.setColumns((state) => {
        const newColumns = [...state];
        newColumns[columnIndex] = {
          ...state[columnIndex],
          cell: () => (
            <td id={id} className={className} style={style}>
              {children}
            </td>
          ),
        };
        return newColumns;
      });
    }
  }, [columnId, columnIndex, options.columns]);

  return null;
};
