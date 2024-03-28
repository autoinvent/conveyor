import { ComponentType, useContext, useMemo } from 'react';

import { SlotKeysContext, SlotsContext } from './Slots';
import { Slot } from './Slot';

export const slotify = <P extends object>(
  WrappedComponent: ComponentType<P>,
  targetSlotKey?: string,
) => {
  return (props: P) => {
    const slots = useContext(SlotsContext);
    const slotKeys = useContext(SlotKeysContext);
    const replaceableSlotKey =
      slotKeys.find((sk) => !slots[sk]?.content) ?? slotKeys[0] ?? '';
    const slotKey = targetSlotKey ?? replaceableSlotKey;

    const slotifiedComponent = useMemo(
      () => (
        <Slot slotKey={slotKey}>
          <WrappedComponent {...props} />
        </Slot>
      ),
      [slotKey],
    );
    return slotifiedComponent;
  };
};
