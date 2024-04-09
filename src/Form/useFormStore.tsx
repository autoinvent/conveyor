import { useContext } from 'react';
import { useStore } from '@tanstack/react-store';

import { FormStore, FormStoreContext } from './FormStoreContext';

export const useFormStore = (cb: (arg: FormStore) => any) => {
    const formStore = useContext(FormStoreContext);
    if (!formStore)
        throw new Error(
            'useFormStore must be used within FormStoreContext',
        );
    return useStore(formStore, cb);
};
