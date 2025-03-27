import { type ComponentProps, useEffect, useRef, useState } from 'react';

import { createStore } from 'zustand';

import type { Data } from '@/base/types';

import { TableProvider } from '../contexts/table-context';
import type { TableComponent, TableState, TableStore } from '../types';
import { DEFAULT_TABLE_COMPONENTS } from '../types';

export type GetTableComponent<
  TDefault extends TableComponent,
  TComponent extends TableComponent | undefined,
  UComponent extends TableComponent | undefined,
> = undefined extends UComponent
  ? undefined extends TComponent
    ? TDefault
    : TComponent
  : UComponent;

export interface UseTableOptions<
  TColumn extends string,
  TData extends Data,
  TTable extends TableComponent | undefined,
  THeader extends TableComponent | undefined,
  THeaderRow extends TableComponent | undefined,
  THead extends TableComponent | undefined,
  TBody extends TableComponent | undefined,
  TRow extends TableComponent | undefined,
  TCell extends TableComponent | undefined,
> extends Omit<TableState<TColumn, TData>, 'components' | 'columnOrder'> {
  columnOrder?: NoInfer<TColumn[]>;
  components?: {
    Table?: TTable;
    Header?: THeader;
    HeaderRow?: THeaderRow;
    Head?: THead;
    Body?: TBody;
    Row?: TRow;
    Cell?: TCell;
  };
}

export const createTableHook = <
  TTable extends TableComponent | undefined,
  THeader extends TableComponent | undefined,
  THeaderRow extends TableComponent | undefined,
  THead extends TableComponent | undefined,
  TBody extends TableComponent | undefined,
  TRow extends TableComponent | undefined,
  TCell extends TableComponent | undefined,
>(defaultComponents: {
  Table?: TTable;
  Header?: THeader;
  HeaderRow?: THeaderRow;
  Head?: THead;
  Body?: TBody;
  Row?: TRow;
  Cell?: TCell;
}) => {
  const availableComponents = {
    Table:
      defaultComponents.Table === undefined
        ? DEFAULT_TABLE_COMPONENTS.Table
        : defaultComponents.Table,
    Header:
      defaultComponents.Header === undefined
        ? DEFAULT_TABLE_COMPONENTS.Header
        : defaultComponents.Header,
    HeaderRow:
      defaultComponents.HeaderRow === undefined
        ? DEFAULT_TABLE_COMPONENTS.HeaderRow
        : defaultComponents.HeaderRow,
    Head:
      defaultComponents.Head === undefined
        ? DEFAULT_TABLE_COMPONENTS.Head
        : defaultComponents.Head,
    Body:
      defaultComponents.Body === undefined
        ? DEFAULT_TABLE_COMPONENTS.Body
        : defaultComponents.Body,
    Row:
      defaultComponents.Row === undefined
        ? DEFAULT_TABLE_COMPONENTS.Row
        : defaultComponents.Row,
    Cell:
      defaultComponents.Cell === undefined
        ? DEFAULT_TABLE_COMPONENTS.Cell
        : defaultComponents.Cell,
  };

  return <
    TColumn extends string,
    TData extends Data,
    UTable extends TableComponent | undefined,
    UHeader extends TableComponent | undefined,
    UHeaderRow extends TableComponent | undefined,
    UHead extends TableComponent | undefined,
    UBody extends TableComponent | undefined,
    URow extends TableComponent | undefined,
    UCell extends TableComponent | undefined,
  >({
    columns,
    columnOrder = [...columns],
    data,
    components,
  }: UseTableOptions<
    TColumn,
    TData,
    UTable,
    UHeader,
    UHeaderRow,
    UHead,
    UBody,
    URow,
    UCell
  >) => {
    const { Table, ...internals } = {
      Table:
        components?.Table === undefined
          ? availableComponents.Table
          : components.Table,
      Header:
        components?.Header === undefined
          ? availableComponents.Header
          : components.Header,
      HeaderRow:
        components?.HeaderRow === undefined
          ? availableComponents.HeaderRow
          : components.HeaderRow,
      Head:
        components?.Head === undefined
          ? availableComponents.Head
          : components.Head,
      Body:
        components?.Body === undefined
          ? availableComponents.Body
          : components.Body,
      Row:
        components?.Row === undefined
          ? availableComponents.Row
          : components.Row,
      Cell:
        components?.Cell === undefined
          ? availableComponents.Cell
          : components.Cell,
    } as {
      Table: TableComponent;
      Header: GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Header,
        THeader,
        UHeader
      >;
      HeaderRow: GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.HeaderRow,
        THeaderRow,
        UHeaderRow
      >;
      Head: GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Head,
        THead,
        UHead
      >;
      Body: GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Body,
        TBody,
        UBody
      >;
      Row: GetTableComponent<typeof DEFAULT_TABLE_COMPONENTS.Row, TRow, URow>;
      Cell: GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Cell,
        TCell,
        UCell
      >;
    };

    const storeRef = useRef<TableStore>(null);
    if (!storeRef.current) {
      storeRef.current = createStore<TableState<TColumn, TData>>()(() => ({
        columns,
        columnOrder,
        data,
        components: { Table, ...internals },
      }));
    }

    const [TableComponents] = useState(() => {
      type TableProps = ComponentProps<
        Exclude<
          GetTableComponent<
            typeof DEFAULT_TABLE_COMPONENTS.Table,
            TTable,
            UTable
          >,
          undefined
        >
      >;
      const TableWithProvider = (props: TableProps) => {
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
