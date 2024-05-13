import { ComponentProps } from 'react';

import { useDependencyStore } from '@/hooks';
import { Field } from '@/types';
import { toField } from '@/utils';

import { ModelIndexCreateButton } from './ModelIndexCreateButton';
import { ModelIndexPagination } from './ModelIndexPagination';
import {
  ModelIndexStore,
  ModelIndexStoreContext,
} from './ModelIndexStoreContext';
import { ModelIndexSettings } from './ModelIndexSettings';
import { ModelIndexTable } from './ModelIndexTable';
import { ModelIndexTitle } from './ModelIndexTitle';

export interface ModelIndexProps
  extends Omit<ModelIndexStore, 'fields'>,
    Omit<ComponentProps<'section'>, 'title'> {
  fields: (string | Field)[];
}

export const ModelIndex = Object.assign(
  ({
    fields,
    data,
    totalDataLength,
    tableView,
    setTableView,
    title,
    onSave,
    onDelete,
    onCreate,
    onOpenFieldSelect,
    showActions = true,
    children,
    ...htmlProps
  }: ModelIndexProps) => {
    const store = useDependencyStore<ModelIndexStore>({
      fields: fields.map((field) => toField(field)),
      data,
      totalDataLength,
      tableView,
      setTableView,
      title,
      onSave,
      onDelete,
      onCreate,
      onOpenFieldSelect,
      showActions,
    });

    return (
      <section {...htmlProps}>
        <ModelIndexStoreContext.Provider value={store}>
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
    CreateButton: ModelIndexCreateButton,
    Settings: ModelIndexSettings,
    Title: ModelIndexTitle,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
  },
);
