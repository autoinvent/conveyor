import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { DataContext, Data } from './DataContext';

export const useData = () => {
    const data = useContext(DataContext);
    const formMethods = useFormContext<Data>();
    return { data, ...formMethods };
};

