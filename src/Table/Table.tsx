import { Table as RBTable } from 'react-bootstrap'

import { CommonProps } from '@/types'

export interface TableProps extends CommonProps { }

export function Table({ id, className, style }: TableProps) {
    return (
        <RBTable id={id} className={className} style={style}>

        </RBTable>
    )
}