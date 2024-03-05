import { createContext, ReactNode, useContext, useMemo } from 'react';

import { Data } from '@/Data'
import { Field } from '@/types';

export interface TableContext {
    fields: Field[];
    data: Data[];
    actionsConfig?: {
        showActions?: boolean
        onSave?: Function,
        onDelete?: Function,
    };
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
    actionsConfig,
    children,
}: TableProviderProps) => {
    const table = {
        fields,
        data,
        actionsConfig,
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
