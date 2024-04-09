import { createContext } from 'react';
import { FieldApi } from '@tanstack/react-form';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/types';

export interface FormControlStore extends Partial<FieldApi<DataType, string>> {
    formControlId: string
}

export const FormControlStoreContext = createContext<Store<FormControlStore> | undefined>(undefined);
