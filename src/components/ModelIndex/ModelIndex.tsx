import { ReactNode, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import { Lens } from '@/components/Lens';
import { Table } from '@/components/Table'
import { Lenses } from '@/contexts/Lenses';
import { Slots } from '@/contexts/Slots';
import { TableProvider } from '@/contexts/TableContext';
import { useAddAlert } from '@/hooks/useAlert';
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

export enum TableState { LOADING, EMPTY, NON_EMPTY, ERROR, UNKNOWN }

export const ModelIndex = Object.assign(({ model, fields, data, children, id, className, style }: ModelIndexProps) => {
    const addAlert = useAddAlert()
    const mqlQueryRequest = useModelListQuery(model, fields)
    const [modelListData, setModelListData] = useState<Data[] | undefined>(data)
    const [tableState, setTableState] = useState<TableState>(TableState.UNKNOWN)
    useEffect(() => {
        if (data === undefined) {
            setTableState(TableState.LOADING)
            mqlQueryRequest()
                .then((response) => {
                    const operationName = `${camelToSnakeCase(model)}_list`
                    const queryData = response[operationName].items
                    setModelListData(queryData)
                    addAlert({ className: 'alert-success', content: `${model} list refreshed!`, expires: 2000 })
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
    }, [data, mqlQueryRequest])
    useEffect(() => {
        if (modelListData) {
            if (modelListData.length) {
                setTableState(TableState.NON_EMPTY)
            } else {
                setTableState(TableState.EMPTY)
            }
        }
    }, [modelListData])
    return (
        <div id={id} className={className} style={style}>
            <Slots slotKeys={[MODEL_INDEX_TITLE_SLOT, MODEL_INDEX_TOOLS_SLOT, MODEL_INDEX_TABLE_SLOT, MODEL_INDEX_PAGINATION_SLOT]}>
                <TableProvider fields={fields} data={modelListData ?? []} >
                    <ModelIndexTitle style={{ fontSize: '40px' }}>{humanizeText(model)}</ModelIndexTitle>
                    <ModelIndexTable>
                        <Table.Body>
                            <Lenses activeLens={tableState}>
                                <Lens lens={TableState.NON_EMPTY}>
                                    <Table.Row />
                                </Lens>
                                <Lens lens={TableState.EMPTY}>
                                    <tr><td colSpan={fields.length} style={{ textAlign: 'center' }} >
                                        <i>No records exist for {model}</i>
                                    </td></tr>
                                </Lens>
                                <Lens lens={TableState.ERROR}>
                                    <tr><td colSpan={fields.length} style={{ textAlign: 'center' }} >
                                        <i className="text-danger">An error occured...</i>
                                    </td></tr>
                                </Lens>
                                <Lens lens={TableState.LOADING}>
                                    <tr><td colSpan={fields.length} style={{ textAlign: 'center' }} >
                                        <Spinner animation='border' />
                                    </td></tr>
                                </Lens>
                            </Lenses>
                        </Table.Body>
                    </ModelIndexTable>
                    {children}
                </TableProvider>
            </Slots>
        </div >
    )
}, {
    Title: ModelIndexTitle,
    Tools: ModelIndexTools,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
});