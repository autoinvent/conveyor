import { useContext } from 'react';

import { ConveyorStoreContext } from './ConveyorStoreContext';

export const useConveyorStore = () => {
  const conveyorStore = useContext(ConveyorStoreContext);
  if (!conveyorStore)
    throw new Error(
      'useConveyorStore must be used within ConveyorStoreContext',
    );
  return conveyorStore;
};
