import { Table, type TableProps } from '@/Table';
import type { DataType } from '@/types';
import { BorderWrapper, DnDContextWrapper, ScrollAreaWrapper } from '@/utils';

import { ModelTableBody } from './ModelTableBody';
import { ModelTableHeader } from './ModelTableHeader';
import {
  type ModelTableState,
  ModelTableStoreProvider,
} from './ModelTableStoreContext';
import { ModelTableHead } from './ModelTableHead';
import { ModelTableHeaderRow } from './ModelTableHeaderRow';
import { ModelTableCell } from './ModelTableCell';
import { ModelTableErrorRow } from './ModelTableErrorRow';
import { ModelTableRow } from './ModelTableRow';

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
              <Table columnIds={renderedFields} data={data} {...tableProps}>
                {children === undefined ? (
                  <>
                    <ModelTable.Header />
                    <ModelTable.Body />
                    <ModelTable.Fallback />
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
    Body: ModelTableBody,
    Cell: ModelTableCell,
    ErrorRow: ModelTableErrorRow,
    Fallback: Table.Fallback,
    Head: ModelTableHead,
    Header: ModelTableHeader,
    HeaderRow: ModelTableHeaderRow,
    Row: ModelTableRow,
  },
);
