import { createContext } from "react"
import { Store } from "@tanstack/react-store";
import { Row, Table } from "@tanstack/react-table"

import { DataType } from '@/types'

export type TableType = Table<DataType>

export type TableStoreType = Store<TableType, (cb: TableType) => TableType>

export const TableStoreContext = createContext<null |
    TableStoreType
>(null)

export const TableRowContext = createContext<Row<DataType> | null>(null)

