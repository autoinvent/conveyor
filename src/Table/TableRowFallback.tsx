import { useStore } from '@tanstack/react-store';

import { CommonProps, WrapperProp } from '@/types';

import { useTableStore } from './useTableStore';

export interface TableRowFallbackProps extends WrapperProp, CommonProps {}

export const TableRowFallback = ({
  children,
  id,
  className,
  style,
}: TableRowFallbackProps) => {
  const tableStore = useTableStore();
  const data = useStore(tableStore, (state) => state.data);
  console.log('length', data);
  if (data.length !== 0) {
    return null;
  }
  return (
    <tr id={id} className={className} style={style}>
      {children}
    </tr>
  );
};
