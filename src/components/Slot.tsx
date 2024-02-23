import { ReactNode, useContext, useEffect } from 'react';

import { SetSlotsContext } from '../contexts/SlotsContext';

interface SlotProps {
    slotKey: string;
    children?: ReactNode;
}

const Slot = ({ slotKey, children }: SlotProps) => {
    const setSlots = useContext(SetSlotsContext);
    useEffect(() => {
        setSlots((slots) => ({
            ...slots,
            [slotKey]: children,
        }));
    }, [slotKey, children]);
    return null;
};

export default Slot;
