import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { StoreSelector } from '@/types'

import { ConveyorStore, ConveyorStoreContext } from './ConveyorStoreContext';

export const useConveyor = (selector?: StoreSelector<ConveyorStore>) => {
  const conveyorStore = useContext(ConveyorStoreContext);
  if (!conveyorStore) {
    throw new Error(
      'useConveyor must be used within ConveyorStoreContext.Provider',
    );
  }
  const conveyor = selector ? useStore(conveyorStore, selector) : undefined

  const setConveyor = (setState: (state: ConveyorStore) => ConveyorStore) => {
    conveyorStore.setState(setState)
  }

  return { conveyor, setConveyor };
};
