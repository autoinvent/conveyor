import { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';

import { CommonProps, WrapperProp } from '@/types';

import { useTable } from './useTable';

export interface TableHeadProps extends WrapperProp, CommonProps {}

export const TableHead = ({
  children,
  id,
  className,
  style,
}: TableHeadProps) => {
  const { getFlatHeaders } = useTable();
  const headers =
    getFlatHeaders().map((header) => {
      const columnDef = header.column.columnDef;
      return (
        <Fragment key={header.id}>
          {flexRender(columnDef.header, header.getContext())}
        </Fragment>
      );
    }) ?? null;
  return (
    <thead id={id} className={className} style={style}>
      <tr>
        {headers}
        {children}
      </tr>
    </thead>
  );
};
