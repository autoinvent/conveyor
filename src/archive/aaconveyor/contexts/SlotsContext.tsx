import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  Fragment,
} from 'react';

export const SlotsContext = createContext<Record<string, ReactNode>>({});
export const SetSlotsContext = createContext<
  Dispatch<SetStateAction<Record<string, ReactNode>>>
>(() => {
  throw new Error('SetSlotsContext must be used within SlotsProvider');
});

interface SlotsProviderProps {
  slotKeys: string[];
  children?: ReactNode;
}

export const SlotsProvider = ({ slotKeys, children }: SlotsProviderProps) => {
  const initialSlots = Object.fromEntries(
    slotKeys.map((slotKey) => [slotKey, null]),
  );
  const [slots, setSlots] = useState(initialSlots as Record<string, ReactNode>);
  return (
    <SetSlotsContext.Provider value={setSlots}>
      <SlotsContext.Provider value={slots}>
        {Object.keys(slots).map((slotKey, index) => (
          <Fragment key={index}>{slots[slotKey]}</Fragment>
        ))}
        {children}
      </SlotsContext.Provider>
    </SetSlotsContext.Provider>
  );
};
