import { ReactNode, useContext, useEffect } from 'react';

import { SetSlotsContext } from './Slots';

export interface SlotProps {
    slotKey: string;
    children?: ReactNode;
}

export const Slot = ({ slotKey, children }: SlotProps) => {
    const setSlots = useContext(SetSlotsContext);
    useEffect(() => {
        setSlots((slots) => ({
            ...slots,
            [slotKey]: children,
        }));
    }, [slotKey, children]);
    return null;
};