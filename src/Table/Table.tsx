import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { Table as RBTable } from 'react-bootstrap'
import { Store } from "@tanstack/react-store";
import { getCoreRowModel, TableOptions, useReactTable, RowData } from '@tanstack/react-table'

import { CommonProps, DataType, WrapperProp } from '@/types'

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableCellFallback } from './TableCellFallback';
import { TableHead } from './TableHead';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableRowFallback } from './TableRowFallback';
import { TableStoreContext } from './contexts';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        setTableOptions: Dispatch<SetStateAction<TableOptions<DataType>>>
    }
}

export interface TableProps extends WrapperProp, CommonProps {
    data: DataType[]
}

export const Table = Object.assign(({ data, children, id, className, style }: TableProps) => {
    const [tableOptions, setTableOptions] = useState<TableOptions<DataType>>({
        data,
        columns: [],
        getCoreRowModel: getCoreRowModel(),
    })
    const table = useReactTable(tableOptions)
    const tableStore = useMemo(() => new Store(table), [tableOptions])
    // const ref = useRef(tableOptions)

    useEffect(() => {
        setTableOptions((options => {
            return { ...options, meta: { setTableOptions } }
        }))
        // ref.current = tableOptions
    }, [])

    useEffect(() => {
        setTableOptions((options) => {
            return { ...options, data }
        })
        // ref.current = tableOptions
    }, [data])

    useEffect(() => {
        console.log('changed')
    }, [tableStore])


    console.log('Table', tableOptions.columns)

    return tableOptions.meta?.setTableOptions ? (
        <>
            <TableStoreContext.Provider value={tableStore}>
                <RBTable id={id} className={className} style={style} hover>
                    {children}
                </RBTable>
            </TableStoreContext.Provider>
        </>
    ) : null
}, {
    Body: TableBody,
    Cell: TableCell,
    CellFallback: TableCellFallback,
    Head: TableHead,
    Header: TableHeader,
    Row: TableRow,
    RowFallback: TableRowFallback,

})

