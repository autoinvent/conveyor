import type { ComponentProps } from 'react';

import { Table as STable } from '@/lib/components/ui/table';
import type { DataType } from '@/types';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableFallback } from './TableFallback';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { type TableState, TableStoreProvider } from './TableStoreContext';

export interface TableProps<D extends DataType>
  extends TableState<D>,
    ComponentProps<typeof STable> {}

export const Table = Object.assign(
  <D extends DataType>({
    columnIds,
    data,
    children,
    ...htmlProps
  }: TableProps<D>) => {
    return (
      <TableStoreProvider columnIds={columnIds} data={data}>
        <STable {...htmlProps}>
          {children === undefined ? (
            <>
              <TableHead />
              <TableBody />
              <TableFallback />
            </>
          ) : (
            children
          )}
        </STable>
      </TableStoreProvider>
    );
  },
  {
    Body: TableBody,
    Fallback: TableFallback,
    Cell: TableCell,
    Head: TableHead,
    HeaderCell: TableHeaderCell,
    HeaderRow: TableHeaderRow,
    Row: TableRow,
  },
);
