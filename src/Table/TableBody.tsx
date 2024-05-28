import type { ComponentProps } from 'react';

import { DataStoreProvider, type DataType } from '@/Data';
import { generateUID } from '@/utils';

import { TableRow } from './TableRow';
import { useTableStore } from './useTableStore';

export interface TableBodyProps extends ComponentProps<'tbody'> {
  getRowId?: (data: DataType) => string | number;
}

export const TableBody = ({
  getRowId = () => generateUID(),
  children,
  className,
  ...htmlProps
}: TableBodyProps) => {
  const data = useTableStore((state) => state.data);

  return data && data.length > 0 ? (
    <tbody className={className} {...htmlProps}>
      {data.map((rowData: DataType) => {
        const rowKey = `table-row-${getRowId(rowData)}`;
        return (
          <DataStoreProvider key={rowKey} data={rowData}>
            {children === undefined ? <TableRow /> : children}
          </DataStoreProvider>
        );
      })}
    </tbody>
  ) : null;
};
