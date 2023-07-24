import { create } from 'zustand';

interface ConveyorState {
  modelName?: string;
  modelId?: string;
  navigate: (modelName?: string, modelId?: string) => void;
}

export const useConveyorStore = create<ConveyorState>()((set) => ({
  modelName: undefined,
  modelId: undefined,
  navigate: (modelName, modelId) => set(() => ({ modelName, modelId })),
}));

export default useConveyorStore;
