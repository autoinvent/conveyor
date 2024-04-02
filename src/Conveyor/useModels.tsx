import { useStore } from '@tanstack/react-store';

import { useConveyorStore } from './useConveyorStore';

export const useModels = () => {
  const conveyorStore = useConveyorStore();
  return useStore(conveyorStore, (state) => state.models);
};
