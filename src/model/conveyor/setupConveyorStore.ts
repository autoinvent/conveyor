import { deepObjectMerge } from '@/utils/functions/common';
import type { ConveyorState, Type, Model } from './types';
import { DEFAULT_TYPES } from './defaults';
import { useConveyorStore } from './useConveyorStore';

// keepDefaultType: false; types: required
export function setupConveyorStore<
  TTypes extends Record<string, Type>,
  TModels extends Record<string, Model<Extract<keyof TTypes, string>>>,
>(
  conveyorState: { types: TTypes; models?: TModels },
  keepDefaultType: false,
): ConveyorState<Record<Extract<keyof TTypes, string>, Type>, TModels>;
// keepDefaultType: true; types: exists
export function setupConveyorStore<
  TTypes extends Record<string, Type>,
  TModels extends Record<
    string,
    Model<Extract<keyof TTypes, string> | keyof typeof DEFAULT_TYPES>
  >,
>(
  conveyorState: { types: TTypes; models?: TModels },
  keepDefaultType?: true,
): ConveyorState<
  Record<Extract<keyof TTypes, string> | keyof typeof DEFAULT_TYPES, Type>,
  TModels
>;
// keepDefaultType: true; types: empty
export function setupConveyorStore<
  TModels extends Record<string, Model<keyof typeof DEFAULT_TYPES>>,
>(
  conveyorState: { models?: TModels },
  keepDefaultType?: true,
): ConveyorState<Record<keyof typeof DEFAULT_TYPES, Type>, TModels>;
export function setupConveyorStore<
  TTypes extends Record<string, Type>,
  TModels extends Record<
    string,
    Model<Extract<keyof TTypes, string> | keyof typeof DEFAULT_TYPES>
  >,
>(
  {
    types,
    models,
  }: {
    types?: TTypes;
    models?: TModels;
  },
  keepDEFAULT_TYPES = true,
): ConveyorState<
  Record<Extract<keyof TTypes, string> | keyof typeof DEFAULT_TYPES, Type>,
  TModels
> {
  const validTypes = types ?? ({} as TTypes);
  const validModels = models ?? ({} as TModels);
  const mergedTypes = keepDEFAULT_TYPES
    ? deepObjectMerge(DEFAULT_TYPES, validTypes)
    : validTypes;
  const newConveyorState = {
    types: mergedTypes,
    models: validModels,
  };
  useConveyorStore.setState(() => newConveyorState);
  return newConveyorState;
}
