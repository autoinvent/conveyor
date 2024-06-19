import { type ReactNode, useEffect, useId } from 'react';

import { useSlotsStore } from './useSlotsStore';

export interface SlotProps {
  slotKey: string;
  children: ReactNode;
}

export const Slot = ({ slotKey, children }: SlotProps) => {
  const slotId = useId();
  const slotKeys = useSlotsStore((state) => state.slotKeys);
  const slotNode = useSlotsStore((state) => state.slotNodes[slotKey]);
  const initalizeSlot = useSlotsStore((state) => state.initalizeSlot);
  const replaceSlot = useSlotsStore((state) => state.replaceSlot);
  const renderSlot = useSlotsStore((state) => state.renderSlot);

  useEffect(() => {
    if (slotNode) {
      if (slotNode.id === slotId) {
        renderSlot(slotKey, children);
      } else if (!slotNode.expiredIds.includes(slotId)) {
        replaceSlot(slotKey, slotId, children);
      }
    } else {
      initalizeSlot(slotKey, slotId, children);
    }
  }, [
    children,
    slotKey,
    slotId,
    slotNode,
    initalizeSlot,
    renderSlot,
    replaceSlot,
  ]);

  return <>{null && slotKeys}</>;
};
