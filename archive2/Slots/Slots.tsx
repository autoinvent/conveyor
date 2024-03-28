import {
  createContext,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';

export type SlotValue = null | {
  content: ReactNode;
  refIds: string[];
};

export const SlotKeysContext = createContext<string[]>([]);
export const SetSlotKeysContext = createContext<
  Dispatch<SetStateAction<string[]>>
>(() => {
  throw new Error('SetSlotsContext must be used within Slots');
});
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
  const [currSlotKeys, setSlotKeys] = useState(slotKeys);
  const [slots, setSlots] = useState({} as Record<string, SlotValue>);
  useLayoutEffect(() => {
    setSlotKeys(slotKeys);
  }, [JSON.stringify(slotKeys)]);

  return (
    <SetSlotKeysContext.Provider value={setSlotKeys}>
      <SetSlotsContext.Provider value={setSlots}>
        <SlotKeysContext.Provider value={currSlotKeys}>
          <SlotsContext.Provider value={slots}>
            <>
              {currSlotKeys.map((slotKey, index) => (
                <Fragment key={index + slotKey}>
                  {slots[slotKey]?.content}
                </Fragment>
              ))}
              {children}
            </>
          </SlotsContext.Provider>
        </SlotKeysContext.Provider>
      </SetSlotsContext.Provider>
    </SetSlotKeysContext.Provider>
  );
};
