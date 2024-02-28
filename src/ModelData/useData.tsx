import { useContext } from 'react';

import { DataContext } from './DataContext';

export const useData = () => {
    const modelData = useContext(DataContext);
    return modelData;
};

