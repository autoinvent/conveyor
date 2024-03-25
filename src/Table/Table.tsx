import { Table as RBTable } from 'react-bootstrap';

import { CommonProps, DataType, WrapperProp } from '@/types';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCellFallback } from './TableCellFallback';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';
import { TableRowFallback } from './TableRowFallback';
import { TableStoreProvider, Column } from './TableStoreContext';

export interface TableProps extends WrapperProp, CommonProps {
  data: DataType[];
  columns: Column[];
}

export const Table = Object.assign(
  ({ data, columns, children, id, className, style }: TableProps) => {
    return (
      <TableStoreProvider data={data} columns={columns}>
        <RBTable id={id} className={className} style={style} hover>
          {children}
        </RBTable>
      </TableStoreProvider>
    );
  },
  {
    Body: TableBody,
    Cell: TableCell,
    CellFallback: TableCellFallback,
    Head: TableHead,
    Header: TableHeaderCell,
    Row: TableRow,
    RowFallback: TableRowFallback,
  },
);
