import { Slot } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';

export interface TableCellProps extends WrapperProp, CommonProps {
  columnId: string;
}

export const TableCell = ({
  columnId,
  children,
  id,
  className,
  style,
}: TableCellProps) => {
  return (
    <Slot slot={columnId}>
      <td id={id} className={className} style={style}>
        {children}
      </td>
    </Slot>
  );
};
