import { Table, type TableProps } from '@/Table';
import type { DataType } from '@/types';

import { ModelTableBody } from './ModelTableBody';
import { ModelTableFallback } from './ModelTableFallback';
import { ModelTableHeader } from './ModelTableHeader';
import {
  type ModelTableState,
  ModelTableStoreProvider,
} from './ModelTableStoreContext';

export interface ModelTableProps<D extends DataType, F extends string>
  extends ModelTableState<D, F>,
    Omit<TableProps<D>, 'columnIds' | 'data'> {}

export const ModelTable = Object.assign(
  <D extends DataType, F extends string>({
    fields,
    tableOptions,
    onUpdate,
    onDelete,
    children,
    ...tableProps
  }: ModelTableProps<D, F>) => {
    const renderedFields = tableOptions?.fieldOrder ?? fields;
    return (
      <ModelTableStoreProvider
        fields={fields}
        tableOptions={tableOptions}
        onUpdate={onUpdate}
        onDelete={onDelete}
      >
        <Table columnIds={renderedFields} {...tableProps}>
          {children === undefined ? (
            <>
              <ModelTable.Header />
              {/* <ModelTable.Body />
            <ModelTable.Fallback /> */}
            </>
          ) : (
            children
          )}
        </Table>
      </ModelTableStoreProvider>
    );
  },
  {
    Header: ModelTableHeader,
    Body: ModelTableBody,
    Fallback: ModelTableFallback,
  },
);
