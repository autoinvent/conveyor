import { HTMLAttributes, useState } from 'react';
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
  HTMLAttributes<HTMLElement> { }

export const ModelIndex = Object.assign(
  ({
    model,
    fields,
    data,
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
        model,
        fields,
        data,
        tableView,
        onTableViewChange,
        onSave,
        onDelete,
        showActions,
      }),
    );

    useStoreSetStateEffect({
      store: modelIndexStore,
      setState: (state) => ({ ...state, model }),
      deps: [model],
    });
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
