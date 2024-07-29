import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import type { DataType } from '@/types';
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
  extends ModelIndexState<D>,
    Omit<ComponentProps<'div'>, 'title'> {}

export const ModelIndex = Object.assign(
  <D extends DataType>({
    fields,
    data,
    tableViewOptions,
    title,
    readOnly,
    onUpdate,
    onDelete,
    paginationOptions,
    children,
    className,
    ...htmlProps
  }: ModelIndexProps<D>) => {
    return (
      <div className={cn('space-y-2.5', className)} {...htmlProps}>
        <ModelIndexStoreProvider
          fields={fields.map(toField)}
          data={data}
          tableViewOptions={tableViewOptions}
          title={title}
          readOnly={readOnly}
          onUpdate={onUpdate}
          onDelete={onDelete}
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
