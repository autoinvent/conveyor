import { TableHead, type TableHeadProps } from '@/Table';
import { cn } from '@/lib/utils';

import { ACTION_COLUMN } from './ModelTable';
import { useEffect, useState } from 'react';

export interface ModelTableActionHeadProps
  extends Omit<TableHeadProps, 'columnId'> {}

export const ModelTableActionHead = ({
  children,
  className,
  ...props
}: ModelTableActionHeadProps) => {
  const [rendered, setRendered] = useState<boolean>(false);

  useEffect( () => {
    setRendered(true);
  }, [])

  return (
    <TableHead
      className={cn(
        'sticky right-0 bg-inherit shadow-left',
        rendered && "w-full",
        className,
      )}
      columnId={ACTION_COLUMN}
      {...props}
    >
      {children === undefined ? null : children}
    </TableHead>
  );
};
