import { ReactNode, createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';
import { DataLens } from '@/Lenses';
import { Field, OnSaveProps } from '@/types';

import { SelectOption } from './types';

export interface ModelFormStore {
  fields: Field[];
  defaultValues: DataType;
  title?: ReactNode;
  onSubmit?: ({ data, dirtyFields }: OnSaveProps) => Promise<any>;
  onCancel?: () => void;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  initialLens?: DataLens;
  showActions?: boolean;
  type?: 'create' | 'detail';
}

export const ModelFormStoreContext = createContext<
  Store<ModelFormStore> | undefined
>(undefined);
