import { useEffect, useId } from 'react';
import { useStore } from '@tanstack/react-store';

import { CommonProps, WrapperProp } from '@/types';

import { TableRowStoreProvider } from './TableRowStoreContext';
import { useTableStore } from './useTableStore';

export interface TableRowProps extends WrapperProp, CommonProps {}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
  const tableRowId = useId();
  const tableStore = useTableStore();
  const rowData = useStore(tableStore, (state) => {
    const rowIndex = state.rows[tableRowId];
    const rowData = rowIndex ? state.data[rowIndex] : null;
    return rowData;
  });

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
  return (
    <TableRowStoreProvider rowData={rowData ?? {}}>
      <tr id={id} className={className} style={style}>
        {children}
      </tr>
    </TableRowStoreProvider>
  );
};
