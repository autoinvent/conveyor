import { ReactNode, createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { SlotType } from '@/Slots';

export interface RoutesStore {
    routes: Record<string, SlotType>
}

export const RoutesStoreContext = createContext<
    Store<RoutesStore> | undefined
>(undefined);
