import { ReactNode, useContext } from 'react';

import { Slot } from '@/components/Slot'
import { DataProvider } from '@/contexts/DataContext';
import { TableContext } from '@/contexts/TableContext';
import { BaseComponentProps } from '@/types';


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
                {data.length > 0 ? data.map((rowData, index) => {
                    return (
                        <DataProvider key={index} value={rowData}>
                            {children}
                        </DataProvider>
                    );
                }) : children
                }
            </tbody>
        </Slot>
    );
};