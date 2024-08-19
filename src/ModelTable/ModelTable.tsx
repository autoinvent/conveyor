import { Table, type TableProps } from '@/Table';
import type { DataType } from '@/types';
import { BorderWrapper, DnDContextWrapper, ScrollAreaWrapper } from '@/utils';

import { ModelTableActionCell } from './ModelTableActionCell';
import { ModelTableActionHead } from './ModelTableActionHead';
import { ModelTableBody } from './ModelTableBody';
import { ModelTableCell } from './ModelTableCell';
import { ModelTableErrorRow } from './ModelTableErrorRow';
import { ModelTableHead } from './ModelTableHead';
import { ModelTableHeadMenu } from './ModelTableHeadMenu';
import { ModelTableHeader } from './ModelTableHeader';
import { ModelTableHeaderRow } from './ModelTableHeaderRow';
import { ModelTableRow } from './ModelTableRow';
import {
  type ModelTableState,
  ModelTableStoreProvider,
} from './ModelTableStoreContext';

export const ACTION_COLUMN = '__ACTION_COLUMN__';
export const DEFAULT_COLUMN_WIDTH = 200; // in pixels

export interface ModelTableProps<
  D extends DataType,
  F extends string,
  T extends F,
> extends ModelTableState<D, F, T>,
    Omit<TableProps<D>, 'columnIds' | 'data'> {}

export const ModelTable = Object.assign(
  <D extends DataType, F extends string, T extends F>({
    fields,
    data,
    tableOptions,
    formOptions,
    onUpdate,
    onDelete,
    children,
    ...tableProps
  }: ModelTableProps<D, F, T>) => {
    const {
      fieldOrder,
      onFieldOrderChange,
      readOnly,
      draggable,
      bordered,
      scrollable,
      columnOptions,
    } = tableOptions;
    const tableColumns = [...fieldOrder].filter(
      (field) => !columnOptions?.[field]?.hidden,
    );
    // const tableWidth = columnOptions ? Object.values(columnOptions) : fieldOrder.length * DEFAULT_COLUMN_WIDTH
    // Action Columnn
    if (fieldOrder.length > 0 && !readOnly && data && data.length > 0) {
      tableColumns.push(ACTION_COLUMN as T);
    }

    return (
      <ModelTableStoreProvider
        fields={fields}
        data={data}
        tableOptions={tableOptions}
        formOptions={formOptions}
        onUpdate={onUpdate}
        onDelete={onDelete}
      >
        <BorderWrapper
          bordered={typeof bordered === 'object' ? true : bordered ?? true}
          className={typeof bordered === 'object' ? bordered?.className : ''}
        >
          <DnDContextWrapper
            draggable={draggable ?? true}
            dndList={fieldOrder}
            onDnDListChange={
              onFieldOrderChange as (newFieldOrder: string[]) => void
            }
          >
            <ScrollAreaWrapper
              scrollable={
                typeof scrollable === 'object' ? true : scrollable ?? true
              }
              className={
                typeof scrollable === 'object' ? scrollable?.className : ''
              }
            >
              <Table columnIds={tableColumns} data={data} {...tableProps}>
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
