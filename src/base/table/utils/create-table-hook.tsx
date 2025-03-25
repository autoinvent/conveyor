import { useEffect, useRef, useState, type ComponentProps } from 'react';
import type { TableState, TableStore, TableComponent } from '../types';
import { DEFAULT_TABLE_COMPONENTS } from '../types';

import type { Data } from '@/base/types';
import { createStore } from 'zustand';
import { TableProvider } from '../contexts/table-context';
// import type { Table as DefaultTable } from '../components/table';
// import type { TableHeader } from '../components/table-header';
// import type { TableHeaderRow } from '../components/table-header-row';
// import type { TableHead } from '../components/table-head';
// import type { TableBody } from '../components/table-body';
// import type { TableRow } from '../components/table-row';
// import type { TableCell } from '../components/table-cell';

export type GetTableComponent<
  TDefault extends TableComponent,
  TCreateDefault extends TableComponent | undefined,
  THook extends TableComponent | undefined,
> = undefined extends THook
  ? undefined extends TCreateDefault
    ? TDefault
    : TCreateDefault
  : THook;

export type GetTableComponent2<
  TTableComponent extends TableComponent,
  UTableComponent extends TableComponent | undefined,
> = undefined extends UTableComponent ? TTableComponent : UTableComponent;

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
// export type CreateTableHook = <
//   TTable extends TableComponent,
//   THeader extends TableComponent,
//   THeaderRow extends TableComponent,
//   THead extends TableComponent,
//   TBody extends TableComponent,
//   TRow extends TableComponent,
//   TCell extends TableComponent,
// >(defaultComponents: {
//   Table?: <_TColumn extends string, _TData extends Data>() => TTable;
//   Header?: <_TColumn extends string, _TData extends Data>() => THeader;
//   HeaderRow?: <_TColumn extends string, _TData extends Data>() => THeaderRow;
//   Head?: <_TColumn extends string, _TData extends Data>() => THead;
//   Body?: <_TColumn extends string, _TData extends Data>() => TBody;
//   Row?: <_TColumn extends string, _TData extends Data>() => TRow;
//   Cell?: <_TColumn extends string, _TData extends Data>() => TCell;
// }) => <
//   TColumn extends string,
//   TData extends Data,
//   UTable extends TableComponent,
//   UHeader extends TableComponent,
//   UHeaderRow extends TableComponent,
//   UHead extends TableComponent,
//   UBody extends TableComponent,
//   URow extends TableComponent,
//   UCell extends TableComponent,
// >(
//   opts: UseTableOptions<
//     TColumn,
//     TData,
//     UTable,
//     UHeader,
//     UHeaderRow,
//     UHead,
//     UBody,
//     URow,
//     UCell
//   >,
// ) => {
//   Table: GetTableComponent<
//     typeof DEFAULT_TABLE_COMPONENTS.Table,
//     () => TTable,
//     () => UTable
//   >;
//   Header: GetTableComponent<typeof TableHeader, THeader, UHeader>;
//   HeaderRow: GetTableComponent<typeof TableHeaderRow, THeaderRow, UHeaderRow>;
//   Head: GetTableComponent<typeof TableHead, THead, UHead>;
//   Body: GetTableComponent<typeof TableBody, TBody, UBody>;
//   Row: GetTableComponent<typeof TableRow, TRow, URow>;
//   Cell: GetTableComponent<typeof TableCell, TCell, UCell>;
// } & GetTableComponent<typeof DefaultTable, TTable, UTable>;

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
    Table: (defaultComponents.Table === undefined
      ? DEFAULT_TABLE_COMPONENTS.Table
      : defaultComponents.Table) as GetTableComponent2<
      typeof DEFAULT_TABLE_COMPONENTS.Table,
      TTable
    >,
    Header: (defaultComponents.Header === undefined
      ? DEFAULT_TABLE_COMPONENTS.Header
      : defaultComponents.Header) as GetTableComponent2<
      typeof DEFAULT_TABLE_COMPONENTS.Header,
      THeader
    >,
    HeaderRow: (defaultComponents.HeaderRow === undefined
      ? DEFAULT_TABLE_COMPONENTS.HeaderRow
      : defaultComponents.HeaderRow) as GetTableComponent2<
      typeof DEFAULT_TABLE_COMPONENTS.HeaderRow,
      THeaderRow
    >,
    Head: (defaultComponents.Head === undefined
      ? DEFAULT_TABLE_COMPONENTS.Head
      : defaultComponents.Head) as GetTableComponent2<
      typeof DEFAULT_TABLE_COMPONENTS.Head,
      THead
    >,
    Body: (defaultComponents.Body === undefined
      ? DEFAULT_TABLE_COMPONENTS.Body
      : defaultComponents.Body) as GetTableComponent2<
      typeof DEFAULT_TABLE_COMPONENTS.Body,
      TBody
    >,
    Row: (defaultComponents.Row === undefined
      ? DEFAULT_TABLE_COMPONENTS.Row
      : defaultComponents.Row) as GetTableComponent2<
      typeof DEFAULT_TABLE_COMPONENTS.Row,
      TRow
    >,
    Cell: (defaultComponents.Cell === undefined
      ? DEFAULT_TABLE_COMPONENTS.Cell
      : defaultComponents.Cell) as GetTableComponent2<
      typeof DEFAULT_TABLE_COMPONENTS.Cell,
      TCell
    >,
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
    const untypedComponents = {
      Table: (components?.Table === undefined
        ? availableComponents.Table
        : components.Table) as GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Table,
        TTable,
        UTable
      >,
      Header: (components?.Header === undefined
        ? DEFAULT_TABLE_COMPONENTS.Header
        : components.Header) as GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Header,
        THeader,
        UHeader
      >,
      HeaderRow: (components?.HeaderRow === undefined
        ? DEFAULT_TABLE_COMPONENTS.HeaderRow
        : components.HeaderRow) as GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.HeaderRow,
        THeaderRow,
        UHeaderRow
      >,
      Head: (components?.Head === undefined
        ? DEFAULT_TABLE_COMPONENTS.Head
        : components.Head) as GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Head,
        THead,
        UHead
      >,
      Body: (components?.Body === undefined
        ? DEFAULT_TABLE_COMPONENTS.Body
        : components.Body) as GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Body,
        TBody,
        UBody
      >,
      Row: (components?.Row === undefined
        ? DEFAULT_TABLE_COMPONENTS.Row
        : components.Row) as GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Row,
        TRow,
        URow
      >,
      Cell: (components?.Cell === undefined
        ? DEFAULT_TABLE_COMPONENTS.Cell
        : components.Cell) as GetTableComponent<
        typeof DEFAULT_TABLE_COMPONENTS.Cell,
        TCell,
        UCell
      >,
    };

    // const untypedComponents = {
    //   Table:
    //     components?.Table === undefined
    //       ? availableComponents.Table
    //       : components?.Table,
    //   Header:
    //     components?.Header === undefined
    //       ? availableComponents.Header
    //       : components?.Header,
    //   HeaderRow:
    //     components?.HeaderRow === undefined
    //       ? availableComponents.HeaderRow
    //       : components?.HeaderRow,
    //   Head:
    //     components?.Head === undefined
    //       ? availableComponents.Head
    //       : components?.Head,
    //   Body:
    //     components?.Body === undefined
    //       ? availableComponents.Body
    //       : components?.Body,
    //   Row:
    //     components?.Row === undefined
    //       ? availableComponents.Row
    //       : components?.Row,
    //   Cell:
    //     components?.Cell === undefined
    //       ? availableComponents.Cell
    //       : components?.Cell
    // }
    // } as {
    //   Table: GetTableComponent2<typeof availableComponents.Table, TTable>;
    //   Header: GetTableComponent2<typeof availableComponents.Header, THeader>;
    //   HeaderRow: GetTableComponent2<
    //     typeof availableComponents.HeaderRow,
    //     THeaderRow
    //   >;
    //   Head: GetTableComponent2<typeof availableComponents.Head, THead>;
    //   Body: GetTableComponent2<typeof availableComponents.Body, TBody>;
    //   Row: GetTableComponent2<typeof availableComponents.Row, TRow>;
    //   Cell: GetTableComponent2<typeof availableComponents.Cell, TCell>;
    // };

    const typedComponents = {
      Table: untypedComponents.Table<TColumn, TData>,
      Header: untypedComponents.Header<TColumn, TData>,
      HeaderRow: untypedComponents.HeaderRow<TColumn, TData>,
      Head: untypedComponents.Head<TColumn, TData>,
      Body: untypedComponents.Body<TColumn, TData>,
      Row: untypedComponents.Row<TColumn, TData>,
      Cell: untypedComponents.Cell<TColumn, TData>,
    };

    const { Table, ...internals } = {
      Table: typedComponents.Table(),
      Header: typedComponents.Header(),
      HeaderRow: typedComponents.HeaderRow(),
      Head: typedComponents.Head(),
      Body: typedComponents.Body(),
      Row: typedComponents.Row(),
      Cell: typedComponents.Cell(),
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
