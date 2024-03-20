import { useEffect } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { CommonProps, DataType, WrapperProp } from '@/types'

import { useTableRow } from './useTableRow'
import { useTableStore } from './useTableStore'

export interface TableHeaderProps extends WrapperProp, CommonProps {
    columnId: string
}

export const TableHeader = ({ columnId, children, id, className, style }: TableHeaderProps) => {
    const { options } = useTableStore(['options'])

    useEffect(() => {
        const columnHelper = createColumnHelper<DataType>()
        const currentColumn = columnHelper.accessor((row) => row, {
            id: columnId,
        })
        options.meta?.setTableOptions((oldOptions) => {
            const oldColumns = oldOptions.columns
            const colIndex = oldColumns.findIndex((column) => column.id === columnId)
            const columns = oldColumns.concat([currentColumn])
            return colIndex === -1 ? { ...oldOptions, columns } : oldOptions
        })
    }, [options.meta?.setTableOptions])

    return (
        <th id={id} className={className} style={style}>
            {children}
        </th>
    )
}