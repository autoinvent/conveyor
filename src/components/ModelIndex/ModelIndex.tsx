import { ReactNode } from 'react'

import { Slots } from '@/contexts/Slots';
import { TableProvider } from '@/contexts/TableContext';
import { BaseComponentProps, Field, Data } from "@/types";
import { humanizeText } from '@/utils';

import { ModelIndexTitle, MODEL_INDEX_TITLE_SLOT } from './ModelIndexTitle';
import { ModelIndexTools, MODEL_INDEX_TOOLS_SLOT } from './ModelIndexTools';
import { ModelIndexTable, MODEL_INDEX_TABLE_SLOT } from './ModelIndexTable';
import { ModelIndexPagination, MODEL_INDEX_PAGINATION_SLOT } from './ModelIndexPagination';

export interface ModelIndexProps extends BaseComponentProps {
    model: string,
    fields: Field[],
    data: Data[],
    children?: ReactNode;
}

export const ModelIndex = Object.assign(({ model, fields, data, children, id, className, style }: ModelIndexProps) => {
    return (
        <div id={id} className={className} style={style}>
            <Slots slotKeys={[MODEL_INDEX_TITLE_SLOT, MODEL_INDEX_TOOLS_SLOT, MODEL_INDEX_TABLE_SLOT, MODEL_INDEX_PAGINATION_SLOT]}>
                <TableProvider fields={fields} data={data} >
                    <ModelIndexTitle>{humanizeText(model)}</ModelIndexTitle>
                    <ModelIndexTable />
                    {children}
                </TableProvider>
            </Slots>
        </div>
    )
}, {
    Title: ModelIndexTitle,
    Tools: ModelIndexTools,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
});