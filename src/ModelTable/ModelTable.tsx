import { useEffect, useRef, useState } from 'react';

import { Table, type TableProps } from '@/Table';
import { cn } from '@/lib/utils';
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

export interface ModelTableProps<
  D extends DataType,
  F extends string,
  DT extends D,
  FT extends F,
> extends ModelTableState<D, F, DT, FT>,
    Omit<TableProps<D>, 'columnIds' | 'data'> {}

export const ModelTable = Object.assign(
  <D extends DataType, F extends string, DT extends D, FT extends F>({
    model,
    fields,
    fieldOrder,
    onFieldOrderChange,
    data,
    tableOptions,
    columnOptions,
    formOptions,
    onUpdate,
    onDelete,
    contextOptions,
    children,
    ...tableProps
  }: ModelTableProps<D, F, DT, FT>) => {
    const { readOnly, draggable, bordered, scrollable } = tableOptions ?? {};
    const tableColumns = [...fieldOrder].filter(
      (field) => !columnOptions?.[field]?.hidden,
    );
    // Action Columnn
    if (fieldOrder.length > 0 && !readOnly && data.length > 0) {
      tableColumns.push(ACTION_COLUMN as FT);
    }
    const [rendered, setRendered] = useState<boolean>(false);
    const ref = useRef<HTMLTableElement>(null);
    useEffect(() => {
      if (ref.current) setRendered(true);
    }, []);

    return (
      <ModelTableStoreProvider
        model={model}
        fields={fields}
        fieldOrder={fieldOrder}
        onFieldOrderChange={onFieldOrderChange}
        data={data}
        tableOptions={tableOptions}
        columnOptions={columnOptions}
        formOptions={formOptions}
        onUpdate={onUpdate}
        onDelete={onDelete}
        contextOptions={contextOptions}
      >
        <BorderWrapper
          bordered={typeof bordered === 'object' ? true : bordered ?? true}
          className={cn(typeof bordered === 'object' && bordered?.className)}
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
              className={cn(
                typeof scrollable === 'object' && scrollable?.className,
              )}
            >
              <Table
                ref={ref}
                columnIds={tableColumns}
                data={data}
                className={cn(!rendered && 'w-full')}
                {...tableProps}
              >
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
