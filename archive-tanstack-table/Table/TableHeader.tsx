import { useEffect } from 'react';

import { CommonProps, WrapperProp } from '@/types';

import { useTable } from './useTable';

export interface TableHeaderProps extends WrapperProp, CommonProps {
  columnId: string;
}

export const TableHeader = ({
  columnId,
  children,
  id,
  className,
  style,
}: TableHeaderProps) => {
  const { options } = useTable();
  const columnIndex = options.columns.findIndex(
    (columnDef) => columnDef.id === columnId,
  );

  useEffect(() => {
    if (
      columnIndex !== -1 &&
      options.columns[columnIndex].header === undefined
    ) {
      options.meta.setColumns((state) => {
        const newColumns = [...state];
        newColumns[columnIndex] = {
          id: columnId,
          ...state[columnIndex],
          header: () => (
            <th id={id} className={className} style={style}>
              {children}
            </th>
          ),
        };
        return newColumns;
      });
    }
  }, [columnId, columnIndex, options.columns]);

  return null;
};
