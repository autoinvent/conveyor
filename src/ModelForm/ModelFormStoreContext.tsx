import { type ReactNode, createContext } from 'react';
import type { Store } from '@tanstack/react-store';

import type { DataType } from '@/Data';
import type { DataLens } from '@/Lenses';
import type { Field, OnSaveProps } from '@/types';

import type { SelectOption } from './types';

export interface ModelFormStore {
  fields: Field[];
  defaultValues: DataType;
  title?: ReactNode;
  onSubmit?: ({ data, dirtyFields }: OnSaveProps) => Promise<any>;
  onCancel?: () => void;
  onDelete?: () => Promise<any>;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  initialLens?: DataLens;
  showActions?: boolean;
  type?: 'create' | 'detail';
}

export const ModelFormStoreContext = createContext<
  Store<ModelFormStore> | undefined
>(undefined);
