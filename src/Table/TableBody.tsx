import type { ComponentProps } from 'react';

import { TableBody as STableBody } from '@/lib/components/ui/table';

import { DataStoreProvider } from '@/Data';
import type { DataType } from '@/types';
import { generateUID } from '@/utils';

import { TableRow } from './TableRow';
import { useTableStore } from './useTableStore';

export interface TableBodyProps extends ComponentProps<typeof STableBody> {
  getRowId?: (data: DataType) => string | number;
}

export const TableBody = ({
  getRowId = () => generateUID(),
  children,
  ...htmlProps
}: TableBodyProps) => {
  const data = useTableStore((state) => state.data);

  return (
    data &&
    data.length > 0 && (
      <STableBody {...htmlProps}>
        {data.map((rowData) => {
          const rowKey = `table-row-${getRowId(rowData)}`;
          return (
            <DataStoreProvider key={rowKey} data={rowData}>
              {children === undefined ? <TableRow /> : children}
            </DataStoreProvider>
          );
        })}
      </STableBody>
    )
  );
};
