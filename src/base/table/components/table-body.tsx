import { useMemo, type ComponentProps } from 'react';

import { useTableStore } from '../hooks/use-table-store';
import { TableRowProvider } from '../contexts/table-row-context';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = ({ children, ...htmlProps }: TableBodyProps) => {
  const dataLength = useTableStore((state) => state.data?.length ?? 0);
  const rows = useMemo(() => {
    console.log(dataLength, 'in body');
    return Array.from(Array(dataLength), (_, rowIndex) => {
      const key = `table-row-${rowIndex}`;
      return (
        <TableRowProvider key={key} rowIndex={rowIndex}>
          {children}
        </TableRowProvider>
      );
    });
  }, [dataLength]);
  return <tbody {...htmlProps}>{rows}</tbody>;
};
