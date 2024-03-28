import { CommonProps, WrapperProp } from '@/types';
import { TableCellFallback } from './TableCellFallback';

export interface TableRowFallbackProps extends WrapperProp, CommonProps { }

export const TableRowFallback = ({
  children,
  id,
  className,
  style,
}: TableRowFallbackProps) => {
  return (
    <tr id={id} className={className} style={style}>
      {children === undefined ?
        <TableCellFallback>
          No Data Found.
        </TableCellFallback> : children}
    </tr>
  );
};
