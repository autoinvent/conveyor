import { createContext } from 'react';
import { FieldComponent, FormApi } from '@tanstack/react-form';
import { Store } from '@tanstack/react-store';

import { DataType } from '@/types';

export interface FormStore {
    data: {
        original: DataType,
        current: DataType,
    },
    FormController: FieldComponent<DataType>
    handleSubmit: (e: SubmitEvent) => void
    reset: () => void
}

export const FormStoreContext = createContext<
    Store<FormStore> | undefined
>(undefined);
