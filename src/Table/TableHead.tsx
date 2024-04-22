import { HTMLAttributes, useEffect, useId } from 'react';

import { Slot, useSlots } from '@/Slots';

import { TableHeaderRow } from './TableHeaderRow';
import { useTable } from './useTable';

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHead = ({ children, ...props }: TableHeadProps) => {
  const { selected: data } = useTable((state) => state.data);
  const refId = useId();
  const slotKey = `table-head-slot-${refId}`;
  const { setSlots } = useSlots();

  // Slot order needs to be reconstructed to preserve ordering on dom structure
  useEffect(() => {
    setSlots((state) => {
      const slotOrder = state.slotOrder.filter((slot) => slot !== slotKey);
      if (data.length > 0) {
        slotOrder.push(slotKey);
      }
      return {
        ...state,
        slotOrder,
      };
    });
  }, [data]);

  return (
    <Slot slot={slotKey}>
      <thead {...props}>
        {children === undefined ? <TableHeaderRow /> : children}
      </thead>
    </Slot>
  );
};
