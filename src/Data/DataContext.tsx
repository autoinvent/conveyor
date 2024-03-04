import { createContext, ReactNode, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form'

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
    const formMethods = useForm<Data>({ values: data, mode: 'onChange' });
    return (
        <DataContext.Provider value={data}>
            <FormProvider {...formMethods}>{children}</FormProvider>
        </DataContext.Provider>
    );
};
