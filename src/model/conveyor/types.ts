import type { ComponentType, ReactNode } from 'react';

export interface ConveyorState<
  TTypes extends Record<string, Type>,
  TModels extends Record<string, Model<Extract<keyof TTypes, string>>>,
> {
  types: TTypes;
  models: TModels;
}

export interface Type {
  DisplayComponent?: ComponentType;
  InputComponent?: ComponentType;
}

export interface Model<TTypeName extends string>
  extends Record<string, FieldOptions<TTypeName>> {}

export interface FieldOptions<TTypeName extends string> {
  label?: ReactNode;
  type?: TTypeName;
  editable?: boolean;
  hidden?: boolean;
  meta?: Record<string, any>;
}
