import { useMemo, type ComponentProps } from 'react';

import { cn } from '@/base/utils';

import { TableProvider } from '../contexts/table-context';
import type { TableInternals, TableState } from '../types';

export interface TableProps<TInternals extends TableInternals>
  extends TableState<TInternals>,
    Omit<ComponentProps<'table'>, 'children'> {}

export const Table = <TInternals extends TableInternals>({
  columnIds,
  data,
  internals,
  layout: Layout,
  className,
  ...htmlProps
}: TableProps<TInternals>) => {
  const layout = useMemo(() => {
    return <Layout {...internals} />;
  }, [Layout, internals]);

  return (
    <TableProvider
      columnIds={columnIds}
      data={data}
      internals={internals}
      layout={Layout}
    >
      <table className={cn('w-auto caption-bottom', className)} {...htmlProps}>
        {layout}
      </table>
    </TableProvider>
  );
};
