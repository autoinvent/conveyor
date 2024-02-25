import { useContext } from 'react';

import { DataContext } from '@/contexts/DataContext';

export const useData = () => {
    const modelData = useContext(DataContext);
    return modelData;
};

