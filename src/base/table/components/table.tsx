import type { ComponentProps } from 'react';

import { cn } from '@/base/utils';

export interface TableProps extends ComponentProps<'table'> {}

export const Table = ({ className, ...htmlProps }: TableProps) => {
  return (
    <table
      className={cn('w-auto caption-bottom bg-background', className)}
      {...htmlProps}
    />
  );
};
