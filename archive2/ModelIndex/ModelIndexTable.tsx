import { ReactNode, useContext } from 'react'

import { Table, TableHead, TableHeader, TableActionHeader, TableBody, TableRow, TableCell, TableActionCell, TableEmptyBody, TableContext } from '@/Table'
import { BaseComponentProps } from "@/types";

import { ModelIndexTableEmptyBody } from './ModelIndexTableEmptyBody';

export interface ModelIndexTableProps extends BaseComponentProps {
    children?: ReactNode
}

export const ModelIndexTable = Object.assign(({ children, id, className, style }: ModelIndexTableProps) => {
    const { fields, data, actionsConfig } = useContext(TableContext)
    return (
        <Table fields={fields} data={data} actionsConfig={actionsConfig} id={id} className={className} style={style}>
            {children === undefined ?
                <>
                    <Table.Head />
                    <Table.Body />
                    <ModelIndexTableEmptyBody />
                </>
                : children}
        </Table>
    )
}, {
    Head: TableHead,
    Header: TableHeader,
    ActionHeader: TableActionHeader,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
    ActionCell: TableActionCell,
    EmptyBody: ModelIndexTableEmptyBody
})