import { Table, type TableProps } from '@/Table';
import type { DataType } from '@/types';

import { ModelTableBody } from './ModelTableBody';
import { ModelTableFallback } from './ModelTableFallback';
import { ModelTableHeader } from './ModelTableHeader';
import {
  type ModelTableState,
  ModelTableStoreProvider,
} from './ModelTableStoreContext';
import {
  BorderWrapper,
  DnDContextWrapper,
  ScrollAreaWrapper,
} from './Wrappers';

export interface ModelTableProps<D extends DataType, F extends string>
  extends ModelTableState<D, F>,
    Omit<TableProps<D>, 'columnIds' | 'data'> {}

export const ModelTable = Object.assign(
  <D extends DataType, F extends string>({
    fields,
    data,
    tableOptions,
    onUpdate,
    onDelete,
    children,
    ...tableProps
  }: ModelTableProps<D, F>) => {
    const renderedFields = tableOptions?.fieldOrder ?? fields;
    const onFieldOrderChange = tableOptions?.onFieldOrderChange;
    return (
      <ModelTableStoreProvider
        fields={fields}
        data={data}
        tableOptions={tableOptions}
        onUpdate={onUpdate}
        onDelete={onDelete}
      >
        <BorderWrapper bordered={tableOptions?.bordered ?? true}>
          <DnDContextWrapper
            draggable={tableOptions?.draggable ?? true}
            dndList={renderedFields}
            onDnDListChange={
              onFieldOrderChange as (newFieldOrder: string[]) => void
            }
          >
            <ScrollAreaWrapper scrollable={tableOptions?.scrollable ?? true}>
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
            </ScrollAreaWrapper>
          </DnDContextWrapper>
        </BorderWrapper>
      </ModelTableStoreProvider>
    );
  },
  {
    Header: ModelTableHeader,
    Body: ModelTableBody,
    Fallback: ModelTableFallback,
  },
);
