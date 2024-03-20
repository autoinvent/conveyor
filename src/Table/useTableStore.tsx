import { useContext } from 'react'
import { useStore } from '@tanstack/react-store'

import { TableStoreContext, TableType } from './contexts'


export const useTableStore = (tableProps: Array<keyof TableType>) => {
    const tableStore = useContext(TableStoreContext)
    if (!tableStore) throw new Error('useTableStore must be used within TableStoreContext.Provider')

    return useStore(tableStore, state => {
        return tableProps.reduce((acc: Pick<TableType, typeof tableProps[number]>, key: keyof TableType) => {
            return Object.assign(acc, { [key]: state[key] })
        }, {} as Pick<TableType, typeof tableProps[number]>)
    })
}