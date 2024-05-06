import { ComponentProps, useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useIsFirstRender } from '@/hooks';

import { ModelIndexPagination } from './ModelIndexPagination';
import {
  ModelIndexStore,
  ModelIndexStoreContext,
} from './ModelIndexStoreContext';
import { ModelIndexTable } from './ModelIndexTable';
import { ModelIndexTitle } from './ModelIndexTitle';

export interface ModelIndexProps
  extends ModelIndexStore,
    ComponentProps<'section'> {}

export const ModelIndex = Object.assign(
  ({
    fields,
    data,
    title,
    onSave,
    onDelete,
    onCreate,
    showActions = true,
    tableView,
    getCurrentSort,
    nextSort,
    swapSort,
    addFilter,
    removeFilter,
    swapFilter,
    setPage,
    setItemsPerPage,
    children,
    ...props
  }: ModelIndexProps) => {
    const [modelIndexStore] = useState(
      new Store<ModelIndexStore>({
        fields,
        data,
        title,
        onSave,
        onDelete,
        onCreate,
        showActions,
        tableView,
        getCurrentSort,
        nextSort,
        swapSort,
        addFilter,
        removeFilter,
        swapFilter,
        setPage,
        setItemsPerPage,
      }),
    );

    const isFirstRender = useIsFirstRender();
    useEffect(() => {
      if (!isFirstRender.current) {
        modelIndexStore.setState(() => {
          return {
            fields,
            data,
            title,
            onSave,
            onDelete,
            onCreate,
            showActions,
            tableView,
            getCurrentSort,
            nextSort,
            swapSort,
            addFilter,
            removeFilter,
            swapFilter,
            setPage,
            setItemsPerPage,
          };
        });
      }
    }, [
      fields,
      data,
      title,
      tableView,
      getCurrentSort,
      onSave,
      onDelete,
      onCreate,
      showActions,
      nextSort,
      swapSort,
      addFilter,
      removeFilter,
      swapFilter,
      setPage,
      setItemsPerPage,
    ]);

    return (
      <section {...props}>
        <ModelIndexStoreContext.Provider value={modelIndexStore}>
          {children === undefined ? (
            <>
              <ModelIndex.Title />
              <ModelIndex.Table />
              <ModelIndex.Pagination />
            </>
          ) : (
            children
          )}
        </ModelIndexStoreContext.Provider>
      </section>
    );
  },
  {
    Title: ModelIndexTitle,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
  },
);
