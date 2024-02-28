import { createContext, ReactNode, useContext, useMemo } from 'react';

import { Data } from '@/contexts/DataContext'
import { Field } from '@/types';

export interface TableContext {
    fields: Field[];
    data: Data[];
    skip?: boolean;
}
export const TableContext = createContext<TableContext>({
    fields: [],
    data: [],
    skip: false,
});

export interface TableProviderProps extends Omit<TableContext, 'skip'> {
    children?: ReactNode;
}

export const TableProvider = ({
    fields,
    data,
    children,
}: TableProviderProps) => {
    const table = {
        fields,
        data,
        skip: true,
    };
    // prevents unecessary renders on data reference change
    const value = useMemo(() => table, [JSON.stringify(table)]);

    const { skip } = useContext(TableContext)
    return skip ? (<>{children}</>) : (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
};
