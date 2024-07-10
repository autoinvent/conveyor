import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import type { DataType, Field } from '@/types';
import { toField } from '@/utils';

import { ModelIndexPagination } from './ModelIndexPagination';
import { ModelIndexSettings } from './ModelIndexSettings';
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
    readOnly,
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
      <div className={cn('space-y-2.5', className)} {...htmlProps}>
        <ModelIndexStoreProvider
          title={title}
          fields={fields.map(toField)}
          data={data}
          readOnly={readOnly}
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
    Title: ModelIndexTitle,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
    Settings: ModelIndexSettings,
  },
);
