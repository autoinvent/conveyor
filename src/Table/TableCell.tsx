import { CommonProps, WrapperProp } from '@/types'

export interface TableCellProps extends WrapperProp, CommonProps {
}

export const TableCell = ({ children, id, className, style }: TableCellProps) => {
    return (
        <td id={id} className={className} style={style}>
            {children}
        </td>
    )
}