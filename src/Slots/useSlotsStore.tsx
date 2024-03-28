import { useContext } from 'react';
import { SlotsStoreContext } from './SlotsStoreContext';

export const useSlotsStore = () => {
  const slotsStore = useContext(SlotsStoreContext);
  if (slotsStore === undefined)
    throw new Error('useSlotsStore must be used within Slots');

  return slotsStore;
};
