import { forwardRef, type ComponentProps } from 'react';

import { Table as STable } from '@/lib/components/ui/table';
import type { DataType } from '@/types';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableFallback } from './TableFallback';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { type TableState, TableStoreProvider } from './TableStoreContext';

export interface TableProps<D extends DataType>
  extends TableState<D>,
    ComponentProps<typeof STable> {}

export const Table = Object.assign(
  forwardRef(<D extends DataType>({
    columnIds,
    data,
    children,
    ...tableProps
  }: TableProps<D>, ref : React.Ref<HTMLTableElement>) => {
    return (
      <TableStoreProvider columnIds={columnIds} data={data}>
        <STable ref={ref} {...tableProps}>
          {children === undefined ? (
            <>
              <TableHeader />
              <TableBody />
              <TableFallback />
            </>
          ) : (
            children
          )}
        </STable>
      </TableStoreProvider>
    );
  }),
  {
    Body: TableBody,
    Fallback: TableFallback,
    Cell: TableCell,
    Head: TableHead,
    Header: TableHeader,
    HeaderRow: TableHeaderRow,
    Row: TableRow,
  },
);
