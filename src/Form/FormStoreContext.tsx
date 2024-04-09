import { createContext } from 'react';
import { FormApi } from '@tanstack/react-form';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/types';

export type FormStore = Partial<FormApi<DataType>>

export const FormStoreContext = createContext<Store<FormStore> | undefined>(undefined);
