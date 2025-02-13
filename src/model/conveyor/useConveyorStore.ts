import { create } from 'zustand';

import { DEFAULT_TYPES } from './defaults';
import type { ConveyorState } from './types';

export const useConveyorStore = create<ConveyorState<any, any>>()(() => ({
  types: DEFAULT_TYPES,
  models: {},
}));
