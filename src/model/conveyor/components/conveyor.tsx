import { FieldType } from '@/model/magql/constants';
import { deepObjectMerge } from '@/utils';
import type { ComponentType, ReactNode } from 'react';
import { create } from 'zustand';

export interface FieldOptions<TTypeName extends string> {
  label?: ReactNode;
  type?: TTypeName;
  editable?: boolean;
  hidden?: boolean;
  meta?: Record<string, any>;
}

export interface Type {
  DisplayComponent?: ComponentType;
  InputComponent?: ComponentType;
}

export interface Model<TTypeName extends string>
  extends Record<string, FieldOptions<TTypeName>> {}

export interface ConveyorState<
  TTypes extends Record<string, Type>,
  TModels extends Record<string, Model<Extract<keyof TTypes, string>>>,
> {
  types: TTypes;
  models: TModels;
}

export const DefaultTypes = {
  [FieldType.ID]: {
    DisplayComponent: () => <div>hello</div>,
    InputComponent: () => <div>world</div>,
  },
} as const;

export const useConveyorStore = create<ConveyorState<any, any>>()(() => ({
  types: DefaultTypes,
  models: {},
}));

// keepDefaultType: false; types: required
export function setupConveyorStore<
  TTypes extends Record<string, Type>,
  TModels extends Record<string, Model<Extract<keyof TTypes, string>>>,
>(
  conveyorState: { types: TTypes; models?: TModels },
  keepDefaultType: false,
): {
  types: Record<Extract<keyof TTypes, string>, Type>;
  models: TModels;
};
// keepDefaultType: true; types: exists
export function setupConveyorStore<
  TTypes extends Record<string, Type>,
  TModels extends Record<
    string,
    Model<Extract<keyof TTypes, string> | keyof typeof DefaultTypes>
  >,
>(
  conveyorState: { types: TTypes; models?: TModels },
  keepDefaultType?: true,
): {
  types: Record<
    Extract<keyof TTypes, string> | keyof typeof DefaultTypes,
    Type
  >;
  models: TModels;
};
// keepDefaultType: true; types: empty
export function setupConveyorStore<
  TModels extends Record<string, Model<keyof typeof DefaultTypes>>,
>(
  conveyorState: { models?: TModels },
  keepDefaultType?: true,
): {
  types: Record<keyof typeof DefaultTypes, Type>;
  models: TModels;
};
export function setupConveyorStore<
  TTypes extends Record<string, Type>,
  TModels extends Record<
    string,
    Model<Extract<keyof TTypes, string> | keyof typeof DefaultTypes>
  >,
>(
  {
    types,
    models,
  }: {
    types?: TTypes;
    models?: TModels;
  },
  keepDefaultTypes = true,
): {
  types?: Record<
    Extract<keyof TTypes, string> | keyof typeof DefaultTypes,
    Type
  >;
  models?: TModels;
} {
  const validTypes = types ?? ({} as TTypes);
  const validModels = models ?? ({} as TModels);
  const mergedTypes = keepDefaultTypes
    ? deepObjectMerge(DefaultTypes, validTypes)
    : types;
  const newConveyorState = {
    types: mergedTypes,
    models: validModels,
  };
  useConveyorStore.setState(() => newConveyorState);
  return newConveyorState;
}
