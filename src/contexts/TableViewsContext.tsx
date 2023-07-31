import { createContext, ReactNode, useReducer, Dispatch } from 'react'

import tableViewsReducer, { TableViews } from '../reducers/tableViewsReducer'
import { ReducerAction } from '../types'

export const TableViewsContext = createContext({} as TableViews)

export const TableViewsDispatchContext = createContext(
  (() => null) as Dispatch<ReducerAction>
)

interface TableViewsProviderProps {
  children: ReactNode
  tableViews?: TableViews
}

const TableViewsProvider = ({
  children,
  tableViews = {},
}: TableViewsProviderProps) => {
  const [tableViewsProvider, dispatch] = useReducer(
    tableViewsReducer,
    tableViews
  )
  return (
    <TableViewsContext.Provider value={tableViewsProvider}>
      <TableViewsDispatchContext.Provider value={dispatch}>
        {children}
      </TableViewsDispatchContext.Provider>
    </TableViewsContext.Provider>
  )
}

export default TableViewsProvider
