import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { FormControlStore, FormControlStoreContext } from './FormControlStoreContext';

export const useFormControlStore = (selector: (state: FormControlStore) => any) => {
    const formControlStore = useContext(FormControlStoreContext);
    if (!formControlStore)
        throw new Error(
            'useFormControlStore must be used within FormControlStoreContext',
        );
    return useStore(formControlStore, selector);
};
