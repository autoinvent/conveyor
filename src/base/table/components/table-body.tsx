import type { ComponentProps } from 'react';

import { useTableStore } from '../hooks/use-table-store';
import { DataProvider } from '@/base/data-store/contexts/data-context';
import type { Data } from '@/base/types';

export interface TableBodyProps extends ComponentProps<'tbody'> {
  getRowId?: (data: Data) => string | number;
}

export const TableBody = ({
  getRowId = (rowData) => JSON.stringify(rowData),
  children,
  ...htmlProps
}: TableBodyProps) => {
  const data = useTableStore((state) => state.data);

  return (
    <tbody {...htmlProps}>
      {data?.map((rowData) => {
        return (
          <DataProvider key={`table-row-${getRowId(rowData)}`} data={rowData}>
            {children}
          </DataProvider>
        );
      })}
    </tbody>
  );
};
