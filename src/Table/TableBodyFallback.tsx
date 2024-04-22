import { HTMLAttributes, useEffect, useId } from 'react';

import { Slot, useSlots } from '@/Slots';

import { useTable } from './useTable';

export interface TableBodyFallbackProps
  extends HTMLAttributes<HTMLTableSectionElement> { }

export const TableBodyFallback = ({
  children,
  ...props
}: TableBodyFallbackProps) => {
  const { selected: { colSpan, data } } = useTable((state) => ({ colSpan: state.columnIds.length, data: state.data }));
  const refId = useId()
  const slotKey = `table-body-fallback-slot-${refId}`
  const { setSlots } = useSlots()

  // Slot order needs to be reconstructed to preserve ordering on dom structure
  useEffect(() => {
    setSlots((state) => {
      const slotOrder = state.slotOrder.filter((slot) => slot !== slotKey)
      if (data.length === 0) {
        slotOrder.push(slotKey)
      }
      return {
        ...state,
        slotOrder
      }
    })
  }, [data])

  return (
    <Slot slot={slotKey}>
      <tbody {...props}>
        <tr>
          <td colSpan={colSpan}>
            {children === undefined ? 'No Records Found.' : children}
          </td>
        </tr>
      </tbody>
    </Slot>
  );
};
