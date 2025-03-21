import type { ComponentProps } from 'react';

import { TableRowProvider } from '../contexts/table-row-context';
import { useTableStore } from '../hooks/use-table-store';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = ({ children, ...htmlProps }: TableBodyProps) => {
  const dataLength = useTableStore((state) => state.data?.length ?? 0);
  const Row = useTableStore((state) => state.components.Row);
  return (
    <tbody {...htmlProps}>
      {Array.from(Array(dataLength), (_, rowIndex) => {
        const key = `table-row-${rowIndex}`;
        return (
          <TableRowProvider key={key} rowIndex={rowIndex}>
            {children === undefined ? <Row /> : children}
          </TableRowProvider>
        );
      })}
    </tbody>
  );
};
