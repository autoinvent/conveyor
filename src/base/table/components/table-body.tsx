import { memo, type ComponentProps } from 'react';

import { useTableStore } from '../hooks/use-table-store';
import { TableRowProvider } from '../contexts/table-row-context';
import { TableRow } from './table-row';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = memo(({ children, ...htmlProps }: TableBodyProps) => {
  const dataLength = useTableStore((state) => state.data?.length ?? 0);
  return (
    <tbody {...htmlProps}>
      {Array.from(Array(dataLength), (_, rowIndex) => {
        const key = `table-row-${rowIndex}`;
        return (
          <TableRowProvider key={key} rowIndex={rowIndex}>
            {children === undefined ? <TableRow /> : children}
          </TableRowProvider>
        );
      })}
    </tbody>
  );
});
