import { Lens } from '@/Lenses'
import { CommonProps, WrapperProp } from '@/types'

import { TableBodyLenses } from './TableBody'

export interface TableRowFallbackProps extends WrapperProp, CommonProps { }

export const TableRowFallback = ({ children, id, className, style }: TableRowFallbackProps) => {
    return (
        <Lens lens={TableBodyLenses.NO_DATA}>
            <tr id={id} className={className} style={style}>
                {children}
            </tr>
        </Lens>
    )
}