import { Slot } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';

export interface TableHeaderCellProps extends WrapperProp, CommonProps {
  columnId: string;
}

export const TableHeaderCell = ({
  columnId,
  children,
  id,
  className,
  style,
}: TableHeaderCellProps) => {
  return (
    <Slot slot={columnId}>
      <th id={id} className={className} style={style}>
        {children}
      </th>
    </Slot>
  );
};
