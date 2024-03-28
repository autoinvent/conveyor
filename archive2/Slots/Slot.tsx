import { ReactNode, useContext, useEffect, useId, useRef } from 'react';

import { SetSlotsContext } from './Slots';

export interface SlotProps {
  slotKey: string;
  children?: ReactNode;
}

export const Slot = ({ slotKey, children }: SlotProps) => {
  const setSlots = useContext(SetSlotsContext);
  const refId = useId();
  useEffect(() => {
    setSlots((slots) => {
      const slotValue = slots[slotKey];
      let refIds = [refId];
      let content = children;
      if (slotValue) {
        const currRefIds = slotValue.refIds;
        if (currRefIds.includes(refId)) {
          if (slotValue.refIds[slotValue.refIds.length - 1] !== refId) {
            content = slotValue.content;
          }
          refIds = currRefIds;
        } else {
          refIds = currRefIds.concat(refIds);
        }
      }
      return {
        ...slots,
        [slotKey]: { content, refIds },
      };
    });
  }, [slotKey, children]);
  return null;
};
