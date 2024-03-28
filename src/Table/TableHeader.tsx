import { Slot } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';

export interface TableHeaderProps extends WrapperProp, CommonProps {
  columnId: string;
}

export const TableHeader = ({
  columnId,
  children,
  id,
  className,
  style,
}: TableHeaderProps) => {
  return (
    <Slot slot={columnId}>
      <th id={id} className={className} style={style}>
        {children}
      </th>
    </Slot>
  );
};
