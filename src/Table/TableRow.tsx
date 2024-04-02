import { useStore } from '@tanstack/react-store';

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
  return (
    <tr id={id} className={className} style={style}>
      <Slots slotOrder={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              return <TableCell key={columnId} columnId={columnId} />;
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
