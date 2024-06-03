import type { ReactNode } from 'react';

import { SlotsStoreProvider } from './SlotsStoreContext';

export interface SlotsProps {
  slotKeys: string[];
  children?: ReactNode;
}

export const Slots = ({ slotKeys, children }: SlotsProps) => {
  return (
    <SlotsStoreProvider slotKeys={slotKeys}>{children}</SlotsStoreProvider>
  );
};
