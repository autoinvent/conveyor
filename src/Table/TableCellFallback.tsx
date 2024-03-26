import { CommonProps, WrapperProp } from '@/types';

import { useTable } from './useTable';


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
  const { getVisibleFlatColumns } = useTable();
  const visibleColumnsLength = getVisibleFlatColumns().length

  return visibleColumnsLength > 0 ? (
    <td colSpan={colSpan ?? visibleColumnsLength} id={id} className={className} style={style}>
      {children}
    </td>
  ) : null
};
