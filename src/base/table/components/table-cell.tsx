import { memo } from 'react';
import { useSlotsStore } from '@/base/slots/hooks/use-slots-store';
import { DefaultTableCell, DefaultTableCellProps } from './default-table-cell';

export interface TableCellProps extends DefaultTableCellProps {
  columnId: string;
  // asChild?:
}

export const TableCell = ({ columnId, ...props }: TableCellProps) => {
  const setSlot = useSlotsStore((state) => state.setSlot);

  setSlot(columnId, <DefaultTableCell columnId={columnId} {...props} />);

  return null;
};
