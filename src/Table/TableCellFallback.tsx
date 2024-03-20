import { CommonProps, WrapperProp } from '@/types'

import { useTableStore } from './useTableStore'

export interface TableCellFallbackProps extends WrapperProp, CommonProps {
    colSpan?: number
}

export const TableCellFallback = ({ colSpan, children, id, className, style }: TableCellFallbackProps) => {
    const { getAllColumns } = useTableStore(['getAllColumns'])
    const numColumns = getAllColumns().reduce((acc, curr) => {
        if (curr.getIsVisible()) return acc + 1
        return acc
    }, 0)
    return (
        <td colSpan={colSpan ?? numColumns} id={id} className={className} style={style}>
            {children}
        </td>
    )
}