import { useStore } from '@tanstack/react-store';

import {
    Table,
    TableBodyFallback,
    TableHeaderCell,
} from '@/Table';
import { CommonProps, WrapperProp } from '@/types';

import { ModelIndexTableActionCell } from './ModelIndexTableActionCell';
import { ModelIndexTableActionHeaderCell } from './ModelIndexTableActionHeaderCell';
import { ModelIndexTableBody } from './ModelIndexTableBody';
import { ModelIndexTableCell } from './ModelIndexTableCell';
import { ModelIndexTableHead } from './ModelIndexTableHead'
import { ModelIndexTableHeaderRow } from './ModelIndexTableHeaderRow'
import { ModelIndexTableRow } from './ModelIndexTableRow';
import { useModelIndexStore } from './useModelIndexStore';

export const MODEL_INDEX_TABLE_ACTION_SLOT = '__model-index-table-action-slot__'

export interface ModelIndexTableProps extends CommonProps, WrapperProp { }

export const ModelIndexTable = Object.assign(
    ({ children, id, className, style }: ModelIndexTableProps) => {
        const modelIndexStore = useModelIndexStore();
        const { fields, data, actionsConfig } = useStore(modelIndexStore, (state) => ({
            data: state.data,
            fields: state.fields,
            actionsConfig: state.actionsConfig
        }));
        const columnIds = actionsConfig?.showActions !== false ? fields.concat([MODEL_INDEX_TABLE_ACTION_SLOT]) : fields

        return (
            <Table
                columnIds={columnIds}
                data={data}
                id={id}
                className={className}
                style={style}
            >
                {children === undefined ? (
                    <>
                        <ModelIndexTable.Head />
                        <ModelIndexTable.Body />
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
        BodyFallback: TableBodyFallback,
        Cell: ModelIndexTableCell,
        Head: ModelIndexTableHead,
        HeaderCell: TableHeaderCell,
        HeaderRow: ModelIndexTableHeaderRow,
        Row: ModelIndexTableRow,
    },
);
