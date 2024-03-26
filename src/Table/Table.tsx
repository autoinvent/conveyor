import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Table as RBTable } from 'react-bootstrap';
import { ColumnDef, RowData, TableOptions, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { CommonProps, DataType, WrapperProp } from '@/types';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCellFallback } from './TableCellFallback';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableRowFallback } from './TableRowFallback';
import { TableContext } from './TableContext';


declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    setColumns: Dispatch<SetStateAction<ColumnDef<DataType>[]>>
  }

  interface Table<TData> {
    options: { meta: TableMeta<TData> } & Omit<TableOptions<TData>, 'meta'>
  }
}

export interface TableProps extends WrapperProp, CommonProps {
  data: DataType[];
  columnIds: string[];
}

export const Table = Object.assign(
  ({ data, columnIds, children, id, className, style }: TableProps) => {
    const [columnOrder, setColumnOrder] = useState(columnIds)
    const [columns, setColumns] = useState<ColumnDef<DataType>[]>(
      columnIds.map((columnId) => {
        const columnHelper = createColumnHelper<DataType>()
        return columnHelper.display({
          id: columnId,
        })
      })
    )

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        columnOrder,
      },
      onColumnOrderChange: setColumnOrder,
      meta: {
        setColumns,
      }
    })

    useEffect(() => {
      if (JSON.stringify(columnIds) !== JSON.stringify(columnOrder)) {
        table.setColumnOrder(columnIds)
      }
      if (columnIds.length !== columns.length) {
        setColumns(columnIds.map((columnId) => {
          const columnHelper = createColumnHelper<DataType>()
          return columnHelper.display({
            id: columnId,
          })
        }))
      }
    }, [columnIds])

    return (
      <TableContext.Provider value={{ ...table }}>
        <RBTable id={id} className={className} style={style} hover>
          {children}
        </RBTable>
      </TableContext.Provider>
    );
  },
  {
    Body: TableBody,
    Cell: TableCell,
    CellFallback: TableCellFallback,
    Head: TableHead,
    Header: TableHeader,
    Row: TableRow,
    RowFallback: TableRowFallback,
  },
);
