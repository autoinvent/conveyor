import { useEffect, useState } from 'react';

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
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <TableHead
      className={cn(
        'sticky right-0 bg-inherit shadow-left',
        rendered ? 'w-full' : 'w-0',
        className,
      )}
      columnId={ACTION_COLUMN}
      {...props}
    >
      {children === undefined ? null : children}
    </TableHead>
  );
};
