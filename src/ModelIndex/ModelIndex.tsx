import { ReactNode, useEffect, useState } from 'react'

import { useAddAlert } from '@/Alerts';
import { useModelListQuery } from '@/Conveyor'
import { Data } from '@/Data'
import { Slots } from '@/Slots';
import { TableProvider, TableProps } from '@/Table'
import { BaseComponentProps, Field, Model } from "@/types";
import { getModelName, handleMQLErrors, humanizeText } from '@/utils';

import { ModelIndexTitle, MODEL_INDEX_TITLE_SLOT } from './ModelIndexTitle';
import { ModelIndexTools, MODEL_INDEX_TOOLS_SLOT } from './ModelIndexTools';
import { ModelIndexTable, MODEL_INDEX_TABLE_SLOT } from './ModelIndexTable';
import { ModelIndexPagination, MODEL_INDEX_PAGINATION_SLOT } from './ModelIndexPagination';
import { ModelIndexProvider, TableState } from './ModelIndexContext';

export interface ModelIndexProps extends BaseComponentProps {
    model: Model,
    fields: Field[],
    data?: Data[],
    actionsConfig?: TableProps['actionsConfig']
    children?: ReactNode;
}

export const ModelIndex = Object.assign(({ model, fields, data, actionsConfig, children, id, className, style }: ModelIndexProps) => {
    const addAlert = useAddAlert()
    const mqlQueryRequest = useModelListQuery(model, fields)
    const [modelListData, setModelListData] = useState<Data[] | undefined>(data)
    const [tableState, setTableState] = useState<TableState>(TableState.DEFAULT)
    const modelName = getModelName(model)
    useEffect(() => {
        if (data === undefined) {
            setTableState(TableState.LOADING)
            mqlQueryRequest()
                .then((response) => {
                    const queryData = response.items
                    setModelListData(queryData)
                    addAlert({ className: 'alert-success', content: `${modelName} list refreshed!`, expires: 2000 })
                    return response
                })
                .catch((err) => {
                    const errorMessages = handleMQLErrors(err)
                    errorMessages.forEach((errorMessage) => {
                        addAlert({ className: 'alert-danger', content: errorMessage })
                    })
                    setTableState(TableState.ERROR)
                })
        }
    }, [JSON.stringify(data), mqlQueryRequest])

    // Not within the request useEffect since the request may not be called if
    // data is defined. 
    useEffect(() => {
        if (modelListData) {
            if (modelListData.length) {
                setTableState(TableState.DEFAULT)
            } else {
                setTableState(TableState.EMPTY)
            }
        }
    }, [JSON.stringify(modelListData)])


    return (
        <div id={id} className={className} style={style}>
            <ModelIndexProvider model={model} tableState={tableState}>
                <TableProvider fields={fields} data={modelListData ?? []} actionsConfig={actionsConfig}>
                    <Slots slotKeys={[MODEL_INDEX_TITLE_SLOT, MODEL_INDEX_TOOLS_SLOT, MODEL_INDEX_TABLE_SLOT, MODEL_INDEX_PAGINATION_SLOT]}>
                        <ModelIndexTitle style={{ fontSize: '40px' }}>{humanizeText(modelName)}</ModelIndexTitle>
                        <ModelIndexTable />
                        {children}
                    </Slots>
                </TableProvider>
            </ModelIndexProvider>
        </div >
    )
}, {
    Title: ModelIndexTitle,
    Tools: ModelIndexTools,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
});