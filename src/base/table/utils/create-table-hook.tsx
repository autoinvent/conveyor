import type { ComponentProps } from 'react';
import { TableProvider } from '../contexts/table-context';
import type { Data } from '@/base/types';
import type { TableComponent, TableState } from '../types';
import { Table as DefaultTable } from '../components/table';
import { TableHeader } from '../components/table-header';
import { TableHeaderRow } from '../components/table-header-row';
import { TableHead } from '../components/table-head';
import { TableBody } from '../components/table-body';
import { TableRow } from '../components/table-row';
import { TableCell } from '../components/table-cell';

const DEFAULT_TABLE_COMPONENTS = {
  Table: DefaultTable,
  Header: TableHeader,
  HeaderRow: TableHeaderRow,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
};

type DefaultTableComponentNames = keyof typeof DEFAULT_TABLE_COMPONENTS;

export interface UseTableOptions<
  TColumnIds extends string,
  TData extends Data,
  TMetaComponentNames extends string,
> extends Omit<TableState<TColumnIds, TData>, 'components'> {
  components?: Partial<
    Record<TMetaComponentNames | DefaultTableComponentNames, TableComponent>
  >;
}

export const createTableHook = <TMetaComponentNames extends string>(
  defaultComponents: Record<TMetaComponentNames, TableComponent>,
) => {
  return <TColumnIds extends string, TData extends Data>({
    columnIds,
    data,
    components,
  }: UseTableOptions<TColumnIds, TData, TMetaComponentNames>) => {
    const { Table, ...internals } = {
      ...DEFAULT_TABLE_COMPONENTS,
      ...defaultComponents,
      ...components,
    };

    const WrappedTable = (props: ComponentProps<typeof Table>) => (
      <TableProvider
        columnIds={columnIds}
        data={data}
        components={{ Table, ...internals }}
      >
        <Table {...props} />
      </TableProvider>
    );
    return Object.assign(WrappedTable, internals);
  };
};
