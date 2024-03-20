import { Lens } from '@/Lenses'
import { CommonProps, WrapperProp } from '@/types'

import { TableBodyLenses } from './TableBody'

export interface TableRowProps extends WrapperProp, CommonProps { }

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
    return (
        <Lens lens={TableBodyLenses.HAS_DATA}>
            <tr id={id} className={className} style={style}>
                {children}
            </tr>
        </Lens>
    )
}