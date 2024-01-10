import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';

import { ModelData, ModelField } from '../__types';

interface ModelContext {
    fields: ModelField[];
    data: ModelData;
    editable: boolean;
    slots: Record<string, ReactNode>;
}
export const ModelContext = createContext<ModelContext>({
    fields: [],
    data: {},
    editable: false,
    slots: {},
});
export const SetModelContext = createContext<Dispatch<SetStateAction<ModelContext>>>(() => {
    throw new Error(
        'SetModelContext must be used within ModelProvider',
    );
})

interface ModelProviderProps {
    value: ModelContext;
    children: ReactNode;
}

export const ModelProvider = ({ value, children }: ModelProviderProps) => {
    const [model, setModel] = useState(value)
    useEffect(() => setModel(value), [JSON.stringify(value)])
    return (
        <SetModelContext.Provider value={setModel}>
            <ModelContext.Provider value={model}>{children}</ModelContext.Provider>
        </SetModelContext.Provider>
    );
};
