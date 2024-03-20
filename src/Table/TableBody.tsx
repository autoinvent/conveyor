import { Lenses } from '@/Lenses'
import { CommonProps, WrapperProp } from '@/types'

import { TableRowContext } from './contexts'
import { useTableStore } from './useTableStore'


export enum TableBodyLenses { NO_DATA, HAS_DATA }

export interface TableBodyProps extends WrapperProp, CommonProps {
    repeat?: boolean
}

export const TableBody = ({ repeat = true, children, id, className, style }: TableBodyProps) => {
    const { getRowModel } = useTableStore(['getRowModel'])
    const rowModel = getRowModel()
    const tableBodyLens = rowModel.rows.length ? TableBodyLenses.HAS_DATA : TableBodyLenses.NO_DATA
    return (
        <tbody id={id} className={className} style={style}>
            <Lenses activeLens={tableBodyLens}>
                {repeat && tableBodyLens === TableBodyLenses.HAS_DATA ? rowModel.rows.map((row) => {
                    return <TableRowContext.Provider key={row.id} value={row}>
                        {children}
                    </TableRowContext.Provider>
                }) : children}
            </Lenses>
        </tbody>
    )
}