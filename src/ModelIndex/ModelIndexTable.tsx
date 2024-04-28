import { HTMLAttributes } from 'react';
import { useStore } from '@tanstack/react-store';

import { Table, TableBodyFallback, TableHeaderCell } from '@/Table';

// import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
// import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell';
// import { ModelIndexTableBody } from './ModelIndexTableBody';
// import { ModelIndexTableCell } from './ModelIndexTableCell';
// import { ModelIndexTableHead } from './ModelIndexTableHead';
// import { ModelIndexTableHeaderRow } from './ModelIndexTableHeaderRow';
// import { ModelIndexTableRow } from './ModelIndexTableRow';
import { useModelIndex } from './useModelIndex';

export const MODEL_INDEX_TABLE_ACTION_SLOT =
  '__model-index-table-action-slot__';

export interface ModelIndexTableProps
  extends HTMLAttributes<HTMLTableElement> {}

export const ModelIndexTable = Object.assign(
  ({ children, ...props }: ModelIndexTableProps) => {
    const {
      selected: { fields, data, showActions },
    } = useModelIndex((state) => {
      const { fields, data, showActions } = state;
      return { fields, data, showActions };
    });

    return (
      <Table columnIds={fields} data={data} {...props}>
        {/* {children === undefined ? (
                    <>
                        <ModelIndexTable.Head />
                        <ModelIndexTable.Body />
                    </>
                ) : (
                    children
                )} */}
      </Table>
    );
  },
  {
    // ActionCell: ModelIndexTableActionCell,
    // ActionHeaderCell: ModelIndexTableActionHeaderCell,
    // Body: ModelIndexTableBody,
    // BodyFallback: TableBodyFallback,
    // Cell: ModelIndexTableCell,
    // Head: ModelIndexTableHead,
    // HeaderCell: TableHeaderCell,
    // HeaderRow: ModelIndexTableHeaderRow,
    // Row: ModelIndexTableRow,
  },
);
