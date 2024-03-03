import { createContext, ReactNode, useMemo } from 'react';

export type Data = Record<string, any>;

export const DataContext = createContext<Data>({});

export interface DataProviderProps {
    value: Data;
    children: ReactNode;
}

export const DataProvider = ({
    value,
    children,
}: DataProviderProps) => {
    const data = useMemo(() => value, [JSON.stringify(value)]);
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};
