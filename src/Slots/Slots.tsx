import {
    createContext,
    Dispatch,
    Fragment,
    ReactNode,
    SetStateAction,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';

export type SlotValue = null | {
    content: ReactNode,
    refIds: string[],
}

export const SlotsMetaContext = createContext<{ slotKeys: string[], replaceableSlotKey: string }>({
    slotKeys: [],
    replaceableSlotKey: ''
})
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

    const replaceableSlotKey = slotKeys.find((sk) => !slots[sk]?.content) ?? slotKeys[0] ?? ''
    const slotsMeta = useMemo(() => ({ slotKeys, replaceableSlotKey }), [JSON.stringify(slotKeys), replaceableSlotKey])
    return (
        <SetSlotsContext.Provider value={setSlots}>
            <SlotsMetaContext.Provider value={slotsMeta}>
                <SlotsContext.Provider value={slots}>
                    <Fragment key={JSON.stringify(slotKeys)}>
                        {slotKeys.map((slotKey, index) =>
                            <Fragment key={index + slotKey}>{slots[slotKey]?.content}</Fragment>
                        )}
                        {children}
                    </Fragment>
                </SlotsContext.Provider>
            </SlotsMetaContext.Provider>
        </SetSlotsContext.Provider>
    );
};
