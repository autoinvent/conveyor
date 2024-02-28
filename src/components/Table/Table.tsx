import { ReactNode } from 'react'
import { Table as RBTable } from 'react-bootstrap'

import { Data } from '@/contexts/DataContext'
import { Slots } from '@/contexts/Slots';
import { TableProvider } from '@/contexts/TableContext';
import { BaseComponentProps, Field } from "@/types";

import { TableHead, TABLE_HEAD_SLOT } from './TableHead';
import { TableHeader } from './TableHeader'
import { TableBody, TABLE_BODY_SLOT } from './TableBody';
import { TableRow } from './TableRow'
import { TableCell } from './TableCell';

export interface TableProps extends BaseComponentProps {
    fields: Field[],
    data: Data[],
    children?: ReactNode;
}

export const Table = Object.assign(({ fields, data, children, id, className, style }: TableProps) => {
    return (
        <RBTable id={id} className={className} style={style} hover bordered>
            <TableProvider fields={fields} data={data}>
                <Slots slotKeys={[TABLE_HEAD_SLOT, TABLE_BODY_SLOT]}>
                    <TableHead />
                    <TableBody>
                        <TableRow />
                    </TableBody>
                    {children}
                </Slots>
            </TableProvider>
        </RBTable>
    )
}, {
    Head: TableHead,
    Header: TableHeader,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
});