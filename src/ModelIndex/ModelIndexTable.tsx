import { ComponentProps } from 'react';

import { Table } from '@/Table';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell';
import { ModelIndexTableBody } from './ModelIndexTableBody';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { ModelIndexTableFallback } from './ModelIndexTableFallback';
import { ModelIndexTableHead } from './ModelIndexTableHead';
import { ModelIndexTableHeaderCell } from './ModelIndexTableHeaderCell';
import { ModelIndexTableHeaderRow } from './ModelIndexTableHeaderRow';
import { ModelIndexTableRow } from './ModelIndexTableRow';
import { ACTION_SLOT } from './constants';
import { useModelIndex } from './useModelIndex';

export interface ModelIndexTableProps
  extends ComponentProps<"table"> { }

export const ModelIndexTable = Object.assign(
  ({ children, ...props }: ModelIndexTableProps) => {
    const { selected } = useModelIndex((state) => {
      return { fields: state.fields, data: state.data };
    });

    const fields = selected.fields.includes(ACTION_SLOT) ? selected.fields : selected.fields.concat(ACTION_SLOT)
    return (
      <Table columnIds={fields} data={selected.data} {...props}>
        {children === undefined ? (
          <>
            <ModelIndexTableHead />
            <ModelIndexTableBody />
            <ModelIndexTableFallback />
          </>
        ) : (
          children
        )}
      </Table>
    );
  },
  {
    ActionCell: ModelIndexTableActionCell,
    ActionHeaderCell: ModelIndexTableActionHeaderCell,
    Body: ModelIndexTableBody,
    Fallback: ModelIndexTableFallback,
    Cell: ModelIndexTableCell,
    Head: ModelIndexTableHead,
    HeaderCell: ModelIndexTableHeaderCell,
    HeaderRow: ModelIndexTableHeaderRow,
    Row: ModelIndexTableRow,
  },
);
