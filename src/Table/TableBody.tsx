import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { DataProvider, DataType } from '@/Data';
import { generateUID } from '@/utils';

import { TableRow } from './TableRow';
import { useTable } from './useTable';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = ({
  children,
  className,
  ...props
}: TableBodyProps) => {
  const { selected: data } = useTable((state) => state.data);

  return data && data.length > 0 ? (
    <tbody className={twMerge('rounded', className)} {...props}>
      {data.map((rowData: DataType) => {
        const rowKey = `table-row-${generateUID()}`;
        return (
          <DataProvider key={rowKey} original={rowData}>
            {children === undefined ? <TableRow /> : children}
          </DataProvider>
        );
      })}
    </tbody>
  ) : null;
};
