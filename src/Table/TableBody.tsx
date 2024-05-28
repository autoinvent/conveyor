import type { ComponentProps } from 'react';

import { DataProvider, type DataType } from '@/Data';

import { TableRow } from './TableRow';
import { useTableStore } from './useTableStore';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = ({
  children,
  className,
  ...htmlProps
}: TableBodyProps) => {
  const data = useTableStore((state) => state.data);

  return data && data.length > 0 ? (
    <tbody className={className} {...htmlProps}>
      {data.map((rowData: DataType, index: number) => {
        const rowKey = `table-row-${index}`;
        return (
          <DataProvider key={rowKey} data={rowData}>
            {children === undefined ? <TableRow /> : children}
          </DataProvider>
        );
      })}
    </tbody>
  ) : null;
};
