import { type ReactNode, useEffect, useId } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useSlotsStore } from './useSlotsStore';

export interface SlotProps {
  slotKey: string;
  children: ReactNode;
}

export const Slot = ({ slotKey, children }: SlotProps) => {
  const slotId = useId();
  const { currentSlotId, expiredSlotIds, replaceSlot, renderSlot } =
    useSlotsStore(
      useShallow((state) => ({
        currentSlotId: state.currentSlotIds[slotKey],
        expiredSlotIds: state.expiredSlotIds[slotKey],
        replaceSlot: state.replaceSlot,
        renderSlot: state.renderSlot,
      })),
    );

  useEffect(() => {
    if (expiredSlotIds && !expiredSlotIds.includes(slotId)) {
      if (currentSlotId !== slotId) {
        replaceSlot(slotKey, slotId, children);
      }
    }
    if (currentSlotId === slotId) {
      renderSlot(slotKey, children);
    }
  }, [
    children,
    slotKey,
    slotId,
    currentSlotId,
    expiredSlotIds,
    renderSlot,
    replaceSlot,
  ]);

  return null;
};
