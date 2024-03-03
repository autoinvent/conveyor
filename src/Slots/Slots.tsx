import {
    createContext,
    Dispatch,
    Fragment,
    ReactNode,
    SetStateAction,
    useLayoutEffect,
    useState,
} from 'react';

export const SlotsContext = createContext<Record<string, ReactNode>>({});
export const SetSlotsContext = createContext<
    Dispatch<SetStateAction<Record<string, ReactNode>>>
>(() => {
    throw new Error('SetSlotsContext must be used within Slots');
});

export interface SlotsProps {
    slotKeys: string[];
    children?: ReactNode;
}

export const Slots = ({ slotKeys, children }: SlotsProps) => {
    const [slots, setSlots] = useState({} as Record<string, ReactNode>);
    useLayoutEffect(() => {
        setSlots(Object.fromEntries(slotKeys.map((slotKey) => [slotKey, null])))
    }, [children, slotKeys])

    return (
        <SetSlotsContext.Provider value={setSlots}>
            <SlotsContext.Provider value={slots}>
                <Fragment key={JSON.stringify(slotKeys)}>
                    {slotKeys.map((slotKey, index) =>
                        <Fragment key={index + slotKey}>{slots[slotKey]}</Fragment>
                    )}
                    {children}
                </Fragment>
            </SlotsContext.Provider>
        </SetSlotsContext.Provider>
    );
};
