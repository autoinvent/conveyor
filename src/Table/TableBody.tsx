import { ReactNode, useContext } from 'react';

import { DataProvider } from '@/Data';
import { Slots, Slot } from '@/Slots'
import { BaseComponentProps } from '@/types';

import { TableContext } from './TableContext';
import { TABLE_ROW_SLOT, TableRow } from './TableRow';

export const TABLE_BODY_SLOT = 'table-body-slot'

export interface TableBodyProps extends BaseComponentProps {
    children?: ReactNode;
}

// Table Body that repeats the content (children) per row of data and preps the
// DataProvider for each row to use their correspondant data
export const TableBody = ({ children, id, className, style }: TableBodyProps) => {
    const { data } = useContext(TableContext);
    return (
        <Slot slotKey={TABLE_BODY_SLOT}>
            <tbody id={id} className={className} style={style}>
                {data.map((rowData, index) => {
                    return (
                        <DataProvider key={index} value={rowData}>
                            <Slots slotKeys={[TABLE_ROW_SLOT]}>
                                <TableRow />
                                {children}
                            </Slots>
                        </DataProvider>
                    );
                })}
            </tbody>
        </Slot>
    );
};