import { HTMLAttributes } from 'react';

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
import { useModelIndex } from './useModelIndex';

export interface ModelIndexTableProps
  extends HTMLAttributes<HTMLTableElement> {}

export const ModelIndexTable = Object.assign(
  ({ children, ...props }: ModelIndexTableProps) => {
    const {
      selected: { fields, data },
    } = useModelIndex((state) => {
      const { fields, data } = state;
      return { fields, data };
    });

    return (
      <Table columnIds={fields} data={data} {...props}>
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
