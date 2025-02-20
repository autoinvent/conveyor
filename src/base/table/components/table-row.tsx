import { cn } from '@/base/utils';
import {
  Children,
  isValidElement,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { useTableStore } from '../hooks/use-table-store';
import { TableCell, type TableCellProps } from './table-cell';

export interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = ({
  children,
  className,
  ...htmlProps
}: TableRowProps) => {
  const columnIds = useTableStore((state) => state.columnIds);
  const columns = Object.fromEntries(
    columnIds.map((columnId) => [
      columnId,
      <TableCell key={`table-cell-${columnId}`} columnId={columnId} />,
    ]),
  );
  const extraChildren: ReactNode[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child?.type === TableCell) {
      const columnId = (child.props as TableCellProps).columnId;
      columns[columnId] = child;
    } else {
      extraChildren.push(child);
    }
  });
  return (
    <tr
      className={cn(
        'border-y bg-background transition-colors hover:bg-muted-subtle',
        className,
      )}
      {...htmlProps}
    >
      {columnIds.map((columnId) => columns[columnId])}
      {extraChildren}
    </tr>
  );
};
