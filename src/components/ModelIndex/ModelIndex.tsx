import { ReactNode, useEffect, useState } from 'react'

import { Slots } from '@/contexts/Slots';
import { TableProvider } from '@/contexts/TableContext';
import { useAddAlert } from '@/hooks/useAlerts';
import { useModelListQuery } from '@/hooks/useModelListQuery'
import { BaseComponentProps, Field, Data } from "@/types";
import { camelToSnakeCase, handleMQLErrors, humanizeText } from '@/utils';

import { ModelIndexTitle, MODEL_INDEX_TITLE_SLOT } from './ModelIndexTitle';
import { ModelIndexTools, MODEL_INDEX_TOOLS_SLOT } from './ModelIndexTools';
import { ModelIndexTable, MODEL_INDEX_TABLE_SLOT } from './ModelIndexTable';
import { ModelIndexPagination, MODEL_INDEX_PAGINATION_SLOT } from './ModelIndexPagination';

export interface ModelIndexProps extends BaseComponentProps {
    model: string,
    fields: Field[],
    data?: Data[],
    children?: ReactNode;
}

export const ModelIndex = Object.assign(({ model, fields, data, children, id, className, style }: ModelIndexProps) => {
    const addAlert = useAddAlert()
    const mqlQueryRequest = useModelListQuery(model, fields)
    const [modelListData, setModelListData] = useState<Data[]>(data ?? [])
    useEffect(() => {
        if (data === undefined) {
            mqlQueryRequest()
                .then((response) => {
                    const operationName = `${camelToSnakeCase(model)}_list`
                    const queryData = response[operationName].items
                    setModelListData(queryData)
                    return response
                })
                .catch((err) => {
                    const errorMessages = handleMQLErrors(err)
                    errorMessages.forEach((errorMessage) => {
                        addAlert({ className: 'alert-danger', content: errorMessage })
                    })
                })
        }
    }, [data, mqlQueryRequest])

    return (
        <div id={id} className={className} style={style}>
            <Slots slotKeys={[MODEL_INDEX_TITLE_SLOT, MODEL_INDEX_TOOLS_SLOT, MODEL_INDEX_TABLE_SLOT, MODEL_INDEX_PAGINATION_SLOT]}>
                <TableProvider fields={fields} data={modelListData} >
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