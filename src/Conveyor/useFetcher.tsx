import { useContext } from 'react';
import { useStore } from '@tanstack/react-store'

import { ConveyorStoreContext } from './ConveyorStoreContext';

export const useFetcher = () => {
    const conveyorStore = useContext(ConveyorStoreContext);
    if (conveyorStore === undefined)
        throw new Error('useFetcher must be used within Conveyor');

    return useStore(conveyorStore, (state) => state.fetcher)
}