import {
    createContext,
    Dispatch,
    Fragment,
    isValidElement,
    ReactNode,
    SetStateAction,
    useLayoutEffect,
    useState,
} from 'react';

export type SlotValue = null | {
    content: ReactNode,
    refIds: string[],
}
export const SlotsContext = createContext<Record<string, SlotValue>>({});
export const SetSlotsContext = createContext<
    Dispatch<SetStateAction<Record<string, SlotValue>>>
>(() => {
    throw new Error('SetSlotsContext must be used within Slots');
});

export interface SlotsProps {
    slotKeys: string[];
    children?: ReactNode;
}

export const Slots = ({ slotKeys, children }: SlotsProps) => {
    const [slots, setSlots] = useState({} as Record<string, SlotValue>);
    useLayoutEffect(() => {
        setSlots(Object.fromEntries(slotKeys.map((slotKey) => [slotKey, null])))
    }, [JSON.stringify(slotKeys)])

    return (
        <SetSlotsContext.Provider value={setSlots}>
            <SlotsContext.Provider value={slots}>
                <Fragment key={JSON.stringify(slotKeys)}>
                    {slotKeys.map((slotKey, index) =>
                        <Fragment key={index + slotKey}>{slots[slotKey]?.content}</Fragment>
                    )}
                    {children}
                </Fragment>
            </SlotsContext.Provider>
        </SetSlotsContext.Provider>
    );
};
