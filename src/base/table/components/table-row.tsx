import { cn } from '@/base/utils';
import {
  Children,
  isValidElement,
  type ReactNode,
  type ComponentProps,
  memo,
  useMemo,
} from 'react';
import { useTableStore } from '../hooks/use-table-store';
import { TableCell, type TableCellProps } from './table-cell';
import { useShallow } from 'zustand/shallow';
export interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = memo(
  ({ children, className, ...htmlProps }: TableRowProps) => {
    const columnIds = useTableStore(useShallow((state) => state.columnIds));
    console.log('rendered table row');

    const renderedChildren = useMemo(() => {
      console.log('rendered table row NO');
      const columns: Record<string, ReactNode> = Object.fromEntries(
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
      return columnIds
        .map((columnId) => columns[columnId])
        .concat(extraChildren);
    }, [children, columnIds]);
    return (
      <tr
        className={cn(
          'border-y bg-background transition-colors hover:bg-muted-subtle',
          className,
        )}
        {...htmlProps}
      >
        {renderedChildren}
      </tr>
    );
  },
);
