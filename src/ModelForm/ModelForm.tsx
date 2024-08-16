import type { ComponentProps } from 'react';

import type { DataType } from '@/types';

import {
  type ModelFormState,
  ModelFormStoreProvider,
} from './ModelFormStoreContext';

export interface ModelFormProps<
  D extends DataType,
  F extends string,
  T extends F,
> extends ModelFormState<D, F, T>,
    Omit<ComponentProps<'form'>, 'onSubmit'> {}

export const ModelForm = <D extends DataType, F extends string, T extends F>({
  fields,
  fieldOrder,
  onFieldOrderChange,
  fieldOptions,
  data,
  onCreate,
  onDelete,
  onUpdate,
  readOnly,
  resolver,
  initialLens,
  ...formProps
}: ModelFormProps<D, F, T>) => {
  return <div>hello</div>;
};
