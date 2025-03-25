import { useEffect, useRef, useState, type ComponentProps } from 'react';
import type { TableState, TableStore, TableComponents } from '../types';
import { DEFAULT_TABLE_COMPONENTS } from '../types';

import type { Data } from '@/base/types';
import { createStore } from 'zustand';
import { TableProvider } from '../contexts/table-context';

export interface UseTableOptions<
  TColumn extends string,
  TData extends Data,
  TComponents extends TableComponents,
> extends Omit<TableState<TColumn, TData>, 'components' | 'columnOrder'> {
  columnOrder?: NoInfer<TColumn[]>;
  components?: Partial<TComponents>;
}

export type CreateTableHook = <TDefaultComponents extends TableComponents>(
  defaultComponents?: TDefaultComponents,
) => <TColumn extends string, TData extends Data>(
  opts: UseTableOptions<
    TColumn,
    TData,
    typeof DEFAULT_TABLE_COMPONENTS & TDefaultComponents
  >,
) => (typeof DEFAULT_TABLE_COMPONENTS & TDefaultComponents)['Table'] &
  (typeof DEFAULT_TABLE_COMPONENTS & TDefaultComponents);

export const createTableHook = <TDefaultComponents extends TableComponents>(
  defaultComponents?: TDefaultComponents,
) => {
  const availableComponents = {
    ...DEFAULT_TABLE_COMPONENTS,
    ...defaultComponents,
  };
  return <TColumn extends string, TData extends Data>({
    columns,
    columnOrder = [...columns],
    data,
    components,
  }: UseTableOptions<TColumn, TData, typeof availableComponents>) => {
    const { Table, ...internals } = {
      ...availableComponents,
      ...components,
    };

    const storeRef = useRef<TableStore>(null);
    if (!storeRef.current) {
      storeRef.current = createStore<TableState<TColumn, TData>>()(() => ({
        columns,
        columnOrder,
        data,
        components: { Table: Table, ...internals },
      }));
    }

    const [TableComponents] = useState(() => {
      const TableWithProvider = (props: ComponentProps<typeof Table>) => {
        return (
          <TableProvider store={storeRef.current}>
            <Table {...props} />
          </TableProvider>
        );
      };
      return Object.assign(TableWithProvider, internals);
    });

    useEffect(() => {
      storeRef.current?.setState({ columnOrder, data });
    }, [columnOrder, data]);

    return TableComponents;
  };
};
