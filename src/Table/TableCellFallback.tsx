import { useStore } from '@tanstack/react-store';

import { CommonProps, WrapperProp } from '@/types';

import { useTableStore } from './useTableStore';

export interface TableCellFallbackProps extends WrapperProp, CommonProps {
  colSpan?: number;
}

export const TableCellFallback = ({
  colSpan,
  children,
  id,
  className,
  style,
}: TableCellFallbackProps) => {
  //   const tableStore = useTableStore();
  //   const columnLength = useStore(tableStore, (state) => {
  //     Object.keys(state.columns
  //   });
  return (
    <td colSpan={2} id={id} className={className} style={style}>
      {children}
    </td>
  );
};
