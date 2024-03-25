import { useEffect, useId } from 'react';
import { useStore } from '@tanstack/react-store';

import { Slots } from '@/Slots';
import { CommonProps, WrapperProp } from '@/types';

import { TableRowStoreProvider } from './TableRowStoreContext';
import { useTableStore } from './useTableStore';

export interface TableRowProps extends WrapperProp, CommonProps {}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
  const tableRowId = useId();
  const tableStore = useTableStore();
  const { rowData, columnIds, x } = useStore(tableStore, (state) => {
    const rowIndex = state.rows[tableRowId];
    const rowData = state.data?.[rowIndex] ?? null;
    const columnIds = state.columns.map((column) => column.id);
    return { rowData, columnIds, x: state.rows };
  });
  console.log(tableRowId, rowData, x);
  useEffect(() => {
    if (rowData === null) {
      tableStore.setState((state) => {
        const rowsLength = Object.keys(state.rows).length;
        return {
          ...state,
          rows: {
            ...state.rows,
            [tableRowId]: rowsLength,
          },
        };
      });
    }
  }, [rowData]);

  if (rowData === null) return null;
  return (
    <TableRowStoreProvider rowData={rowData}>
      <tr id={id} className={className} style={style}>
        <Slots slotKeys={columnIds}>{children}</Slots>
      </tr>
    </TableRowStoreProvider>
  );
};
