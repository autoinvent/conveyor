import { useStore } from '@tanstack/react-store';

import { CommonProps, WrapperProp } from '@/types';

import { TableRowFallback } from './TableRowFallback';
import { useTableStore } from './useTableStore';

export interface TableBodyFallbackProps extends WrapperProp, CommonProps { }

export const TableBodyFallback = ({
  children,
  id,
  className,
  style,
}: TableBodyFallbackProps) => {
  const tableStore = useTableStore();
  const dataLength = useStore(tableStore, (state) => state.data.length);
  return dataLength === 0 ? (
    <tbody id={id} className={className} style={style}>
      {children === undefined ? <TableRowFallback /> : children}
    </tbody>
  ) : null;
};
