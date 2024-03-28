import { useStore } from '@tanstack/react-store';

import { Slots } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';

import { useTableStore } from './useTableStore';

export interface TableRowProps extends WrapperProp, CommonProps {}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
  const tableStore = useTableStore();
  const columnIds = useStore(tableStore, (state) => state.columnIds);
  return (
    <tr id={id} className={className} style={style}>
      <Slots slotOrder={columnIds}>{children}</Slots>
    </tr>
  );
};
