import { ReactNode } from 'react';
import { Table as RBTable } from 'react-bootstrap';

import { Data } from '@/Data';
import { BaseComponentProps, Field } from '@/types';

import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableActionHeader } from './TableActionHeader';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TableActionCell } from './TableActionCell';
import { TableEmptyBody } from './TableEmptyBody';
import { TableContext, TableProvider } from './TableContext';

export interface TableProps extends BaseComponentProps {
  fields: Field[];
  data: Data[];
  actionsConfig?: TableContext['actionsConfig'];
  children?: ReactNode;
}

export const Table = Object.assign(
  ({
    fields,
    data,
    actionsConfig,
    children,
    id,
    className,
    style,
  }: TableProps) => {
    return (
      <RBTable id={id} className={className} style={style} hover bordered>
        <TableProvider
          fields={fields}
          data={data}
          actionsConfig={actionsConfig}
        >
          {children}
        </TableProvider>
      </RBTable>
    );
  },
  {
    Head: TableHead,
    Header: TableHeader,
    ActionHeader: TableActionHeader,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
    ActionCell: TableActionCell,
    EmptyBody: TableEmptyBody,
  },
);
