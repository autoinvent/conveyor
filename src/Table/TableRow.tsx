import { useStore } from '@tanstack/react-store';

import { useData } from '@/Data';
import { Slots } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';

import { TableCell } from './TableCell';
import { useTableStore } from './useTableStore';

export interface TableRowProps extends WrapperProp, CommonProps {
  prefilled?: boolean;
}

export const TableRow = ({
  prefilled,
  children,
  id,
  className,
  style,
}: TableRowProps) => {
  const tableStore = useTableStore();
  const columnIds = useStore(tableStore, (state) => state.columnIds);
  const { current } = useData();
  return (
    <tr id={id} className={className} style={style}>
      <Slots slotOrder={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              const columnData = current[columnId];
              const displayData =
                typeof columnData === 'object'
                  ? JSON.stringify(columnData)
                  : columnData;
              return (
                <TableCell key={columnId} columnId={columnId}>
                  {displayData}
                </TableCell>
              );
            })}
            {children}
          </>
        ) : (
          children
        )}
      </Slots>
    </tr>
  );
};
