import { useContext } from 'react'

import { TableRowContext } from './contexts'


export const useTableRow = () => {
    const row = useContext(TableRowContext)
    if (!row) throw new Error('useTableRow must be used within TableRowContext.Provider')
    return row
}