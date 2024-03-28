import { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';

import { Lens } from '@/Lenses';
import { CommonProps, WrapperProp } from '@/types';

import { TableBodyLens } from './TableBody';
import { useTableRow } from './useTableRow';

export interface TableRowProps extends WrapperProp, CommonProps {}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
  const row = useTableRow();
  const cells =
    row?.getVisibleCells().map((cell) => {
      return (
        <Fragment key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Fragment>
      );
    }) ?? null;
  return (
    <Lens lens={TableBodyLens.HAS_DATA}>
      <tr id={id} className={className} style={style}>
        {cells}
        {children}
      </tr>
    </Lens>
  );
};
