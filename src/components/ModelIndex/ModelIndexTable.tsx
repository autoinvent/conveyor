import { ReactNode, useContext } from 'react'

import { Slot } from '@/components/Slot'
import { Table } from '@/components/Table/Table'
import { TableContext } from '@/contexts/TableContext';
import { BaseComponentProps } from "@/types";

export const MODEL_INDEX_TABLE_SLOT = "model-index-table-slot"


export interface ModelIndexTableProps extends BaseComponentProps {
    children?: ReactNode
}

export const ModelIndexTable = ({ children, id, className, style }: ModelIndexTableProps) => {
    const { fields, data } = useContext(TableContext)
    return (
        <Slot slotKey={MODEL_INDEX_TABLE_SLOT}>
            <Table fields={fields} data={data} id={id} className={className} style={style}>
                {children}
            </Table>
        </Slot>
    )
}