import { ComponentProps, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useStoreSetStateEffect } from '@/hooks';

import { ModelIndexPagination } from './ModelIndexPagination';
import {
  ModelIndexStore,
  ModelIndexStoreContext,
} from './ModelIndexStoreContext';
import { ModelIndexTable } from './ModelIndexTable';
import { ModelIndexTitle } from './ModelIndexTitle';

export interface ModelIndexProps
  extends ModelIndexStore,
  ComponentProps<"section"> {}

export const ModelIndex = Object.assign(
  ({
    fields,
    data,
    title,
    tableView,
    onTableViewChange,
    onSave,
    onDelete,
    showActions = true,
    children,
    ...props
  }: ModelIndexProps) => {
    const [modelIndexStore] = useState(
      new Store<ModelIndexStore>({
        fields,
        data,
        title,
        tableView,
        onTableViewChange,
        onSave,
        onDelete,
        showActions,
      }),
    );

    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, fields }),
      deps: [fields],
    });
    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, data }),
      deps: [data],
    });

    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, title }),
      deps: [title],
    });
    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, tableView }),
      deps: [tableView],
    });
    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, onTableViewChange }),
      deps: [onTableViewChange],
    });
    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, onSave }),
      deps: [onSave],
    });
    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, onDelete }),
      deps: [onDelete],
    });
    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, showActions }),
      deps: [showActions],
    });

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
