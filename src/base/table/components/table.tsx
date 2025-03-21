import type { ComponentProps } from 'react';

import { cn } from '@/base/utils';
import { useTableStore } from '../hooks/use-table-store';

export interface TableProps extends ComponentProps<'table'> {}

export const Table = ({ className, children, ...htmlProps }: TableProps) => {
  const Header = useTableStore((state) => state.components.Header);
  const Body = useTableStore((state) => state.components.Body);
  return (
    <table
      className={cn('w-auto caption-bottom bg-background', className)}
      {...htmlProps}
    >
      {children === undefined ? (
        <>
          <Header />
          <Body />
        </>
      ) : (
        children
      )}
    </table>
  );
};
