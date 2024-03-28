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
  const tableStore = useTableStore();
  const columnIdsLength = useStore(
    tableStore,
    (state) => state.columnIds.length,
  );

  return (
    <td
      colSpan={colSpan ?? columnIdsLength}
      id={id}
      className={className}
      style={style}
    >
      {children}
    </td>
  );
};
