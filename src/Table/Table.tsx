import { Table as RBTable } from 'react-bootstrap';

import { CommonProps, DataType, WrapperProp } from '@/types';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCellFallback } from './TableCellFallback';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableRowFallback } from './TableRowFallback';
import { TableStoreProvider } from './TableStoreContext';

export interface TableProps extends WrapperProp, CommonProps {
  data: DataType[];
}

export const Table = Object.assign(
  ({ data, children, id, className, style }: TableProps) => {
    return (
      <TableStoreProvider data={data}>
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
    Header: TableHeader,
    Row: TableRow,
    RowFallback: TableRowFallback,
  },
);
