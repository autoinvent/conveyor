import { type ReactNode, useEffect } from 'react';

import { useSlotsStore } from '../hooks/use-slot-store';

export interface SlotProps {
  slotId: string;
  children: ReactNode;
}
export const Slot = ({ slotId, children }: SlotProps) => {
  const setSlot = useSlotsStore((state) => state.setSlot);

  useEffect(() => {
    setSlot(slotId, children);
  }, [slotId, children, setSlot]);
  return null;
};
