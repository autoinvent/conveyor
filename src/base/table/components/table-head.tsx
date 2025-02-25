import { Slot } from '@/base/slot/component/slot';
import { cn, humanizeText } from '@/base/utils';
import type { ComponentProps, FC } from 'react';

export interface TableHeadProps extends ComponentProps<'th'> {
  columnId: string;
  render?: FC<TableHeadRenderProps>;
}

export interface TableHeadRenderProps {
  columnId: string;
}

export const TableHead = ({
  columnId,
  render: Render,
  children,
  className,
  ...htmlProps
}: TableHeadProps) => {
  return (
    <Slot slotId={columnId}>
      {Render ? (
        <Render columnId={columnId} />
      ) : (
        <th
          className={cn(
            'relative px-2 py-1 text-left text-muted-foreground',
            className,
          )}
          {...htmlProps}
        >
          {children === undefined ? humanizeText(columnId) : children}
        </th>
      )}
    </Slot>
  );
};
