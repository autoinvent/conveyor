import {
    createContext,
    ReactNode,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react';

export const SlotsContext = createContext<Record<string, ReactNode>>({});
export const SetSlotsContext = createContext<
    Dispatch<SetStateAction<Record<string, ReactNode>>>
>(() => {
    throw new Error('SetSlotsContext must be used within SlotsProvider');
});

interface SlotsProviderProps {
    initialValue: Record<string, ReactNode>;
    children: ReactNode;
}

export const SlotsProvider = ({ initialValue, children }: SlotsProviderProps) => {
    const [slots, setSlots] = useState(initialValue);
    return (
        <SetSlotsContext.Provider value={setSlots}>
            <SlotsContext.Provider value={slots}>{children}</SlotsContext.Provider>
        </SetSlotsContext.Provider>
    );
};
