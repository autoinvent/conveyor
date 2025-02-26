import type { ComponentProps, FC } from 'react';

import { Slot } from '@/base/slot/component/slot';
import { cn, humanizeText } from '@/base/utils';

export interface TableHeadProps extends Omit<ComponentProps<'th'>, 'children'> {
  columnId: string;
  render?: FC<TableHeadRenderProps>;
}

export interface TableHeadRenderProps {
  columnId: string;
}

export const TableHead = ({
  columnId,
  render: Render,
  className,
  ...htmlProps
}: TableHeadProps) => {
  return (
    <Slot slotId={columnId}>
      <th
        className={cn(
          'relative px-2 py-1 text-left text-muted-foreground',
          className,
        )}
        {...htmlProps}
      >
        {Render ? <Render columnId={columnId} /> : humanizeText(columnId)}
      </th>
    </Slot>
  );
};
