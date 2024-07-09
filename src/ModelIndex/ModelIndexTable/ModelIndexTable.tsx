import type { ComponentProps } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { ScrollArea, ScrollBar } from '@/lib/components/ui/scroll-area';
import type { STable } from '@/lib/components/ui/table';

import { Table } from '@/Table';
import type { DataType } from '@/types';

import type { ModelIndexState } from '../ModelIndexStoreContext';
import { useModelIndexStore } from '../useModelIndexStore';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell';
import { ModelIndexTableBody } from './ModelIndexTableBody';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { ModelIndexTableHead } from './ModelIndexTableHead';
import { ModelIndexTableHeaderCell } from './ModelIndexTableHeaderCell';
import { ModelIndexTableHeaderRow } from './ModelIndexTableHeaderRow';
import { ModelIndexTableRow } from './ModelIndexTableRow';
import { ACTION_COLUMN } from './constants';
import { ConditionalWrapper } from '@/utils';

export interface ModelIndexTableProps extends ComponentProps<typeof STable> {
  scrollable?: boolean;
  bordered?: boolean;
}

export const ModelIndexTable = Object.assign(
  ({
    scrollable = true,
    bordered = true,
    children,
    ...props
  }: ModelIndexTableProps) => {
    let fieldNames = useModelIndexStore(
      useShallow<ModelIndexState<DataType>, string[]>((state) =>
        state.fields.map((field) => field.name),
      ),
    );
    const data = useModelIndexStore((state) => state.data);
    const showActions = useModelIndexStore((state) => state.showActions);

    if (
      fieldNames.length > 0 &&
      showActions &&
      data &&
      data.length > 0 &&
      !fieldNames.includes(ACTION_COLUMN)
    ) {
      fieldNames = fieldNames.concat([ACTION_COLUMN]);
    }

    return (
      <ConditionalWrapper
        condition={bordered}
        wrapper={(base) => <div className="rounded-md border">{base}</div>}
      >
        <ConditionalWrapper
          condition={scrollable}
          wrapper={(base) => (
            <ScrollArea>
              {base}
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        >
          <Table columnIds={fieldNames} data={data} {...props}>
            {children === undefined ? (
              <>
                <ModelIndexTableHead />
                <ModelIndexTableBody />
                <Table.Fallback />
              </>
            ) : (
              children
            )}
          </Table>
        </ConditionalWrapper>
      </ConditionalWrapper>
    );
  },
  {
    ActionCell: ModelIndexTableActionCell,
    ActionHeaderCell: ModelIndexTableActionHeaderCell,
    Body: ModelIndexTableBody,
    Fallback: Table.Fallback,
    Cell: ModelIndexTableCell,
    Head: ModelIndexTableHead,
    HeaderCell: ModelIndexTableHeaderCell,
    HeaderRow: ModelIndexTableHeaderRow,
    Row: ModelIndexTableRow,
  },
);
