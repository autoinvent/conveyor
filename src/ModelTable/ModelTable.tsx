import { Table, type TableProps } from '@/Table';
import type { DataType } from '@/types';
import { BorderWrapper, DnDContextWrapper, ScrollAreaWrapper } from '@/utils';

import { ModelTableActionCell } from './ModelTableActionCell';
import { ModelTableActionHead } from './ModelTableActionHead';
import { ModelTableBody } from './ModelTableBody';
import { ModelTableCell } from './ModelTableCell';
import { ModelTableErrorRow } from './ModelTableErrorRow';
import { ModelTableHead } from './ModelTableHead';
import { ModelTableHeader } from './ModelTableHeader';
import { ModelTableHeaderRow } from './ModelTableHeaderRow';
import { ModelTableRow } from './ModelTableRow';
import {
  type ModelTableState,
  ModelTableStoreProvider,
} from './ModelTableStoreContext';
import { useState } from 'react';
import { ModelTableHeadMenu } from './ModelTableHeadMenu';

export const ACTION_COLUMN = '__ACTION_COLUMN__';

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
    const [internalFieldOrder, setInternalFieldOrder] = useState(fields);
    let renderedFields = tableOptions?.fieldOrder ?? internalFieldOrder;
    const onFieldOrderChange =
      tableOptions?.onFieldOrderChange ?? setInternalFieldOrder;
    const newTableOptions = { ...tableOptions };

    // internal fieldOrder
    if (!tableOptions?.onFieldOrderChange) {
      newTableOptions.onFieldOrderChange = setInternalFieldOrder;
      newTableOptions.fieldOrder = internalFieldOrder;
    }

    // Action Columnn
    const readOnly = tableOptions?.readOnly;
    if (
      renderedFields.length > 0 &&
      !readOnly &&
      data &&
      data.length > 0 &&
      !renderedFields.includes(ACTION_COLUMN as F)
    ) {
      renderedFields = renderedFields.concat([ACTION_COLUMN as F]);
      newTableOptions.fieldOrder = renderedFields;
    }
    if (
      renderedFields.includes(ACTION_COLUMN as F) &&
      renderedFields.length === 1
    ) {
      renderedFields = [];
      newTableOptions.fieldOrder = renderedFields;
    }

    return (
      <ModelTableStoreProvider
        fields={fields}
        data={data}
        tableOptions={newTableOptions}
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
                    <ModelTableHeader />
                    <ModelTableBody />
                    <Table.Fallback />
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
    ActionCell: ModelTableActionCell,
    ActionHead: ModelTableActionHead,
    Body: ModelTableBody,
    Cell: ModelTableCell,
    ErrorRow: ModelTableErrorRow,
    Fallback: Table.Fallback,
    Head: ModelTableHead,
    Header: ModelTableHeader,
    HeaderRow: ModelTableHeaderRow,
    HeadMenu: ModelTableHeadMenu,
    Row: ModelTableRow,
  },
);
