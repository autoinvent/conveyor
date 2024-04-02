import { useData } from '@/Data';
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
  const { current } = useData();
  const columnData = current[columnId];
  const displayData =
    typeof columnData === 'object' ? JSON.stringify(columnData) : columnData;
  return (
    <Slot slot={columnId}>
      <td id={id} className={className} style={style}>
        {children === undefined ? displayData : children}
      </td>
    </Slot>
  );
};
