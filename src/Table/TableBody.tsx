import { HTMLAttributes, useEffect, useId } from 'react';

import { DataProvider, DataType } from '@/Data';
import { Slot, useSlots } from '@/Slots';
import { generateUID } from '@/utils';

import { TableRow } from './TableRow';
import { useTable } from './useTable';

export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = ({ children, ...props }: TableBodyProps) => {
  const { selected: data } = useTable((state) => state.data);
  const refId = useId();
  const slotKey = `table-body-slot-${refId}`;
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
      <tbody {...props}>
        {data.map((rowData: DataType) => {
          const rowKey = `table-row-${generateUID()}`;
          return (
            <DataProvider key={rowKey} original={rowData}>
              {children === undefined ? <TableRow /> : children}
            </DataProvider>
          );
        })}
      </tbody>
    </Slot>
  );
};
