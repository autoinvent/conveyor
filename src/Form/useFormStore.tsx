import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { FormStore, FormStoreContext } from './FormStoreContext';

export const useFormStore = (selector: (state: FormStore) => any) => {
    const formStore = useContext(FormStoreContext);
    if (!formStore)
        throw new Error(
            'useFormStore must be used within FormStoreContext',
        );
    return useStore(formStore, selector);
};
