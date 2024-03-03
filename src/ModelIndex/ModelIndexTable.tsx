import { ReactNode, useContext } from 'react'
import { Spinner } from 'react-bootstrap'

import { Lens, Lenses } from '@/Lenses';
import { Slot } from '@/Slots'
import { Table, TableHead, TableHeader, TableActionHeader, TableBody, TableRow, TableCell, TableActionCell, TableEmptyBody, TableContext } from '@/Table'
import { BaseComponentProps } from "@/types";

import { ModelIndexContext, TableState } from './ModelIndexContext';

export const MODEL_INDEX_TABLE_SLOT = "model-index-table-slot"


export interface ModelIndexTableProps extends BaseComponentProps {
    children?: ReactNode
}

export const ModelIndexTable = Object.assign(({ children, id, className, style }: ModelIndexTableProps) => {
    const { fields, data } = useContext(TableContext)
    const { model, tableState } = useContext(ModelIndexContext)
    return (
        <Slot slotKey={MODEL_INDEX_TABLE_SLOT}>
            <Table fields={fields} data={data} id={id} className={className} style={style}>
                <Table.EmptyBody>
                    <Lenses activeLens={tableState}>
                        <Lens lens={TableState.EMPTY}>
                            <tr><td colSpan={fields.length} style={{ textAlign: 'center' }} >
                                <i>No records exist for {model}</i>
                            </td></tr>
                        </Lens>
                        <Lens lens={TableState.ERROR}>
                            <tr><td colSpan={fields.length} style={{ textAlign: 'center' }} >
                                <i className="text-danger">An error occured...</i>
                            </td></tr>
                        </Lens>
                        <Lens lens={TableState.LOADING}>
                            <tr><td colSpan={fields.length} style={{ textAlign: 'center' }} >
                                <Spinner animation='border' />
                            </td></tr>
                        </Lens>
                    </Lenses>
                </Table.EmptyBody>
                {children}
            </Table>
        </Slot>
    )
}, {
    Head: TableHead,
    Header: TableHeader,
    ActionHeader: TableActionHeader,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
    ActionCell: TableActionCell,
    EmptyBody: TableEmptyBody
})