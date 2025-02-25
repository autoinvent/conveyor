import { type ComponentProps, type FC, useMemo } from 'react';

import { cn } from '@/base/utils';

import { TableProvider } from '../contexts/table-context';
import type {
  DefaultTableInternals,
  TableInternals,
  TableState,
} from '../types';
import { TableHeader } from './table-header';
import { TableHeaderRow } from './table-header-row';
import { TableHead } from './table-head';
import { TableBody } from './table-body';
import { TableCell } from './table-cell';
import { TableRow } from './table-row';

const DEFAULT_LAYOUT: TableProps<TableInternals>['layout'] = ({
  TableBody,
}) => {
  return (
    <>
      <TableHeader />
      <TableBody />
    </>
  );
};

const DEFAULT_INTERNALS: TableProps<TableInternals>['internals'] = {
  TableHeader,
  TableHeaderRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
};

export type InferredTableInternals = Record<string, FC<any>> &
  Partial<DefaultTableInternals>;

export interface TableProps<TInternals extends InferredTableInternals>
  extends Pick<TableState<TableInternals>, 'columnIds' | 'data'>,
    Omit<ComponentProps<'table'>, 'children'> {
  layout?: FC<NoInfer<TInternals> & DefaultTableInternals>;
  internals?: TInternals;
}

export const Table = <TInternals extends InferredTableInternals>({
  columnIds,
  data,
  internals = DEFAULT_INTERNALS as TInternals,
  layout: Layout = DEFAULT_LAYOUT as FC<
    NoInfer<TInternals> & DefaultTableInternals
  >,
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
      <table
        className={cn('w-auto caption-bottom bg-background', className)}
        {...htmlProps}
      >
        {layout}
      </table>
    </TableProvider>
  );
};
