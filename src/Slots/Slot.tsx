import { type ReactNode, useEffect, useId } from 'react';

import { useSlotsStore } from './useSlotsStore';

export interface SlotProps {
  slotKey: string;
  children: ReactNode;
}

export const Slot = ({ slotKey, children }: SlotProps) => {
  const slotId = useId();
  const setSlotNode = useSlotsStore((state) => state.setSlotNode);

  useEffect(() => {
    setSlotNode(slotKey, slotId, children);
  }, [children, slotKey, slotId, setSlotNode]);

  return null;
};
