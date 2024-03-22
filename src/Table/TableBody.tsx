import { Fragment } from 'react';
import { useStore } from '@tanstack/react-store';

import { CommonProps, WrapperProp } from '@/types';

import { useTableStore } from './useTableStore';

export interface TableBodyProps extends WrapperProp, CommonProps {
  repeat?: boolean;
}

export const TableBody = ({
  repeat = true,
  children,
  id,
  className,
  style,
}: TableBodyProps) => {
  const tableStore = useTableStore();
  const data = useStore(tableStore, (state) => state.data);
  return (
    <tbody id={id} className={className} style={style}>
      {repeat
        ? data.map((rowData, index) => {
            const rowKey = `table-body-row-${index}-${JSON.stringify(rowData)}`;
            return <Fragment key={rowKey}>{children}</Fragment>;
          })
        : children}
    </tbody>
  );
};
