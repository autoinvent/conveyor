import { useRef } from 'react';

import { TableHead, type TableHeadProps } from '@/Table';
import { cn } from '@/lib/utils';

import { ACTION_COLUMN } from './ModelTable';

export interface ModelTableActionHeadProps
  extends Omit<TableHeadProps, 'columnId'> {}

export const ModelTableActionHead = ({
  children,
  className,
  ...props
}: ModelTableActionHeadProps) => {
  const ref = useRef(null);
  return (
    <TableHead
      ref={ref}
      className={cn(
        'sticky right-0 bg-inherit shadow-left',
        ref.current ? 'w-[99%]' : 'w-[1%]',
        className,
      )}
      columnId={ACTION_COLUMN}
      {...props}
    >
      {children === undefined ? null : children}
    </TableHead>
  );
};
