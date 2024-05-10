import { ReactNode, createContext } from 'react';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';
import { SelectOption } from '@/Form';
import { DataLens } from '@/Lenses';
import { Field, OnSaveProps } from '@/types';

export interface ModelFormStore {
  fields: Field[];
  defaultValues: DataType;
  title?: ReactNode;
  onSubmit?: ({ data, dirtyFields }: OnSaveProps) => Promise<any>;
  onCancel?: () => void;
  onOpenFieldSelect?: (fieldName: string) => Promise<SelectOption[]>;
  initialLens?: DataLens;
  showActions?: boolean;
}

export const ModelFormStoreContext = createContext<
  Store<ModelFormStore> | undefined
>(undefined);
