import { HTMLAttributes } from 'react';

import { DataProvider, DataType } from '@/Data';
import { generateUID } from '@/utils';

import { TableRow } from './TableRow';
import { useTable } from './useTable';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> { }

export const TableBody = ({ children, ...props }: TableBodyProps) => {
  const { selected: data } = useTable((state) => state.data);

  return (
    <tbody {...props}>
      {data.map((rowData: DataType) => {
        const rowKey = `table-row-${generateUID()}`;
        return (
          <DataProvider key={rowKey} original={rowData}>
            {children === undefined ? <TableRow /> : children}
          </DataProvider>
        );
      })}
    </tbody>
  );
};
