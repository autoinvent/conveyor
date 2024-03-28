import { Fragment } from 'react';

import { Lenses } from '@/Lenses';
import { CommonProps, WrapperProp } from '@/types';

import { TableRowContext } from './TableRowContext';
import { useTable } from './useTable';

export enum TableBodyLens {
  HAS_DATA = 'has-data',
  HAS_NO_DATA = 'has-no-data',
}

export interface TableBodyProps extends WrapperProp, CommonProps {}

export const TableBody = ({
  children,
  id,
  className,
  style,
}: TableBodyProps) => {
  const { getRowModel } = useTable();
  const rows = getRowModel().rows;
  return (
    <tbody id={id} className={className} style={style}>
      <Lenses
        activeLens={
          rows.length > 0 ? TableBodyLens.HAS_DATA : TableBodyLens.HAS_NO_DATA
        }
      >
        {rows.length > 0
          ? rows.map((row) => {
              const rowKey = `table-row-${row.id}`;
              return (
                <TableRowContext.Provider key={rowKey} value={{ ...row }}>
                  {children}
                </TableRowContext.Provider>
              );
            })
          : children}
      </Lenses>
    </tbody>
  );
};
