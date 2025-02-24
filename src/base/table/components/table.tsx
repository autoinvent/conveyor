import { type FC, useMemo, type ComponentProps } from 'react';

import { cn } from '@/base/utils';

import { TableProvider } from '../contexts/table-context';
import type { TableInternals, TableState } from '../types';
import { TableBody } from './table-body';
import { TableRow } from './table-row';
import { TableCell } from './table-cell';

const DEFAULT_LAYOUT: TableProps<TableInternals>['layout'] = ({
  TableBody,
}) => {
  return <TableBody />;
};

const DEFAULT_INTERNALS: TableProps<TableInternals>['internals'] = {
  TableBody,
  TableRow,
  TableCell,
};

export interface TableProps<TInternals extends Partial<TableInternals>>
  extends Pick<TableState<TableInternals>, 'columnIds' | 'data'>,
    Omit<ComponentProps<'table'>, 'children'> {
  layout?: FC<NoInfer<TInternals | TableInternals>>;
  internals?: TInternals;
}

export const Table = <TInternals extends Partial<TableInternals>>({
  columnIds,
  data,
  internals = DEFAULT_INTERNALS as TInternals,
  layout: Layout = DEFAULT_LAYOUT as FC<NoInfer<TInternals | TableInternals>>,
  className,
  ...htmlProps
}: TableProps<TInternals>) => {
  const combinedInternals = useMemo(() => {
    return { ...DEFAULT_INTERNALS, ...internals };
  }, [internals]);

  const layout = useMemo(() => {
    return <Layout {...combinedInternals} />;
  }, [Layout, combinedInternals]);

  return (
    <TableProvider
      columnIds={columnIds}
      data={data}
      internals={combinedInternals}
      layout={Layout}
    >
      <table className={cn('w-auto caption-bottom', className)} {...htmlProps}>
        {layout}
      </table>
    </TableProvider>
  );
};
