import { useStore } from '@tanstack/react-store';

import { Slots } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';
import { humanizeText } from '@/utils';

import { TableHeaderCell } from './TableHeaderCell';
import { useTableStore } from './useTableStore';

export interface TableHeaderRowProps extends WrapperProp, CommonProps {
  prefilled?: boolean;
}

export const TableHeaderRow = ({
  prefilled,
  children,
  id,
  className,
  style,
}: TableHeaderRowProps) => {
  const tableStore = useTableStore();
  const columnIds = useStore(tableStore, (state) => state.columnIds);
  return (
    <tr id={id} className={className} style={style}>
      <Slots slotOrder={columnIds}>
        {children === undefined || prefilled ? (
          <>
            {columnIds.map((columnId) => {
              return (
                <TableHeaderCell key={columnId} columnId={columnId}>
                  {humanizeText(columnId)}
                </TableHeaderCell>
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
