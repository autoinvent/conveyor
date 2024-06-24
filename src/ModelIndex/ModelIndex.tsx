import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import type { DataType, Field } from '@/types';
import { toField } from '@/utils';

import { ModelIndexCreateButton } from './ModelIndexCreateButton';
import { ModelIndexPagination } from './ModelIndexPagination';
import {
  type ModelIndexState,
  ModelIndexStoreProvider,
} from './ModelIndexStoreContext';
import { ModelIndexTable } from './ModelIndexTable';
import { ModelIndexTitle } from './ModelIndexTitle';

export interface ModelIndexProps<D extends DataType>
  extends Omit<ModelIndexState<D>, 'fields'>,
    Omit<ComponentProps<'div'>, 'title'> {
  fields: (string | Field)[];
}

export const ModelIndex = Object.assign(
  <D extends DataType>({
    title,
    fields,
    data,
    showActions = true,
    onCreate,
    onUpdate,
    onDelete,
    tableView,
    onTableViewChange,
    paginationOptions,
    children,
    className,
    ...htmlProps
  }: ModelIndexProps<D>) => {
    return (
      <div className={cn('container mx-auto py-10', className)} {...htmlProps}>
        <ModelIndexStoreProvider
          title={title}
          fields={fields.map(toField)}
          data={data}
          showActions={showActions}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
          tableView={tableView}
          onTableViewChange={onTableViewChange}
          paginationOptions={paginationOptions}
        >
          {children === undefined ? (
            <>
              <ModelIndex.Title />
              <ModelIndex.Table />
              <ModelIndex.Pagination />
            </>
          ) : (
            children
          )}
        </ModelIndexStoreProvider>
      </div>
    );
  },
  {
    CreateButton: ModelIndexCreateButton,
    Title: ModelIndexTitle,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
  },
);
