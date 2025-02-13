import { DEFAULT_TYPES } from './defaults';
import type { ConveyorState } from './types';
import { create } from 'zustand';

export const useConveyorStore = create<ConveyorState<any, any>>()(() => ({
  types: DEFAULT_TYPES,
  models: {},
}));
