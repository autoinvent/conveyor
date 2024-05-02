import { useCallback, useState } from 'react'
import { Store } from '@tanstack/react-store';

import { TableView, TableViewFilter } from "@/types"

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}
export type SortSequence = Sort[]

export interface UseTableViewOptions {
  initialTableView?: TableView
  sortSequence?: SortSequence
}

export const useTableView = ({ initialTableView = {}, sortSequence = [Sort.ASC, Sort.DESC, Sort.NONE] }: UseTableViewOptions) => {
  const [tableViewStore] = useState(new Store<TableView>(initialTableView))

  /*
      Sorting Functions to be returned
  */
  const nextSort = useCallback((field: string) => {
    const sortSequenceMap = Object.fromEntries(sortSequence.map((seq, index) => [seq, index]))
    const nextSortHelper = (sortArray: string[], currIndex: number, currSortKey: Sort) => {
      const nextSortKey = sortSequence[(sortSequenceMap[currSortKey] + 1) % sortSequence.length]
      if (nextSortKey === Sort.ASC) {
        sortArray[currIndex] = field
      } else if (nextSortKey === Sort.DESC) {
        sortArray[currIndex] = `-${field}`
      } else {
        sortArray.splice(currIndex, 1)
      }
    }

    tableViewStore.setState((state) => {
      const newSort = state.sort ? [...state.sort] : []
      // Keeps track of whether sort already contains field or not
      let found = false
      // Updates the sort value of the field if it exists
      newSort.forEach((f: string, index) => {
        if (f.endsWith(field)) {
          if (f.length === field.length) {
            found = true
            nextSortHelper(newSort, index, Sort.ASC)
          } else if ((f.length === field.length + 1 && f.charAt(0) === '-')) {
            found = true
            nextSortHelper(newSort, index, Sort.DESC)
          }
        }
      })
      // Append the new sort field if it didn't exist
      if (!found) {
        newSort.push(field)
        nextSortHelper(newSort, newSort.length - 1, Sort.NONE)
      }
      return {
        ...state,
        sort: newSort,
      }
    })
  }, [sortSequence, tableViewStore.setState])

  const swapSort = (index1: number, index2: number) => {
    tableViewStore.setState((state) => {
      const newSort = state.sort ? [...state.sort] : []
      if (index1 >= newSort.length || index2 >= newSort.length || index1 < 0 || index2 < 0) {
        throw new Error(('index1 and index2 must be valid indicies!'))
      }

      const field1Sort = newSort[index1]
      newSort[index1] = newSort[index2]
      newSort[index2] = field1Sort

      return {
        ...state,
        sort: newSort,
      }
    })
  }

  /*
    Filter Functions to be returned
  */
  const addFilter = useCallback((filter: TableViewFilter, filterGroup: number = 0) => {
    tableViewStore.setState((state) => {
      const newFilter = state.filter ? [...state.filter] : []
      if (filterGroup > newFilter.length || filterGroup < 0) {
        if (newFilter.length === 0) {
          throw new Error('filter is empty, try filterGroup = 0 first!')
        } else {
          throw new Error(`filterGroup must be between 0 and ${newFilter.length}!`)
        }
      }

      if (filterGroup === newFilter.length) {
        newFilter.push([filter])
      } else {
        newFilter[filterGroup].push(filter)
      }

      return {
        ...state,
        filter: newFilter
      }
    })
  }, [tableViewStore.setState])

  const removeFilter = useCallback((filterGroup: number, filterGroupIndex: number) => {
    tableViewStore.setState((state) => {
      const newFilter = state.filter ? [...state.filter] : []
      if (filterGroup >= newFilter.length || filterGroup < 0 ||
        filterGroupIndex >= newFilter[filterGroup].length || filterGroupIndex < 0
      ) {
        throw new Error('filter at the specified location does not exist!')
      }

      if (newFilter[filterGroup].length === 1) {
        newFilter.splice(filterGroup, 1)
      } else {
        newFilter[filterGroup].splice(filterGroupIndex, 1)
      }

      return {
        ...state,
        filter: newFilter
      }
    })
  }, [tableViewStore.setState])

  const swapFilter = useCallback((filterGroup1: number, filterGroupIndex1: number, filterGroup2: number, filterGroupIndex2: number) => {
    tableViewStore.setState((state) => {
      const newFilter = state.filter ? [...state.filter] : []
      if (filterGroup1 >= newFilter.length || filterGroup1 < 0 ||
        filterGroupIndex1 >= newFilter[filterGroup1].length || filterGroupIndex1 < 0 ||
        filterGroup2 >= newFilter.length || filterGroup2 < 0 ||
        filterGroupIndex2 >= newFilter[filterGroup2].length || filterGroupIndex2 < 0
      ) {
        throw new Error('Both filter indicies must be valid!')
      }

      const filter1 = newFilter[filterGroup1][filterGroupIndex1]
      newFilter[filterGroup1][filterGroupIndex1] = newFilter[filterGroup2][filterGroupIndex2]
      newFilter[filterGroup2][filterGroupIndex2] = filter1

      return {
        ...state,
        filter: newFilter
      }
    })
  }, [tableViewStore.setState])

  /*
    Pagination Functions to be returned
  */
  const setPage = (newPage: number) => {
    tableViewStore.setState((state) => {
      return {
        ...state,
        page: newPage
      }
    })
  }

  const setItemsPerPage = (newPerPage: number) => {
    tableViewStore.setState((state) => {
      return {
        ...state,
        perPage: newPerPage
      }
    })
  }

  return { nextSort, swapSort, addFilter, removeFilter, swapFilter, setPage, setItemsPerPage, tableViewStore }
} 