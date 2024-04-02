import { useStore } from '@tanstack/react-store';

import {
  Table,
  TableBody,
  TableBodyFallback,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from '@/Table';
import { CommonProps, WrapperProp } from '@/types';

import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexTableProps extends CommonProps, WrapperProp {}

export const ModelIndexTable = Object.assign(
  ({ children, id, className, style }: ModelIndexTableProps) => {
    const modelIndexStore = useModelIndexStore();
    const { fields, data } = useStore(modelIndexStore, (state) => ({
      data: state.data,
      fields: state.fields,
    }));

    return (
      <Table
        columnIds={fields}
        data={data}
        id={id}
        className={className}
        style={style}
      >
        {children}
      </Table>
    );
  },
  {
    Body: TableBody,
    BodyFallback: TableBodyFallback,
    Cell: TableCell,
    Head: TableHead,
    HeaderCell: TableHeaderCell,
    HeaderRow: TableHeaderRow,
    Row: TableRow,
  },
);
