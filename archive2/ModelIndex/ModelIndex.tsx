import { ReactNode, useEffect, useState } from 'react';

import { useAddAlert } from '@/Alerts';
import { useModelListQuery } from '@/Conveyor';
import { Data } from '@/Data';
import { TableProvider, TableProps } from '@/Table';
import { BaseComponentProps, Field, Model } from '@/types';
import { getModelName, handleMQLErrors, humanizeText } from '@/utils';

import { ModelIndexTitle } from './ModelIndexTitle';
import { ModelIndexTools } from './ModelIndexTools';
import { ModelIndexTable } from './ModelIndexTable';
import { ModelIndexPagination } from './ModelIndexPagination';
import { ModelIndexProvider, TableState } from './ModelIndexContext';

export interface ModelIndexProps extends BaseComponentProps {
  model: Model;
  fields: Field[];
  data?: Data[];
  actionsConfig?: TableProps['actionsConfig'];
  children?: ReactNode;
}

export const ModelIndex = Object.assign(
  ({
    model,
    fields,
    data,
    actionsConfig,
    children,
    id,
    className,
    style,
  }: ModelIndexProps) => {
    const addAlert = useAddAlert();
    const mqlQueryRequest = useModelListQuery(model, fields);
    const [modelListData, setModelListData] = useState<Data[] | undefined>(
      data,
    );
    const [tableState, setTableState] = useState<TableState>(
      TableState.DEFAULT,
    );
    const modelName = getModelName(model);
    useEffect(() => {
      if (data === undefined) {
        setTableState(TableState.LOADING);
        mqlQueryRequest()
          .then((response) => {
            const queryData = response.items;
            setModelListData(queryData);
            addAlert({
              className: 'alert-success',
              content: `${modelName} list refreshed!`,
              expires: 2000,
            });
            return response;
          })
          .catch((err) => {
            const errorMessages = handleMQLErrors(err);
            errorMessages.forEach((errorMessage) => {
              addAlert({ className: 'alert-danger', content: errorMessage });
            });
            setTableState(TableState.ERROR);
          });
      }
    }, [JSON.stringify(data), mqlQueryRequest]);

    // Not within the request useEffect since the request may not be called if
    // data is defined.
    useEffect(() => {
      if (modelListData) {
        if (modelListData.length) {
          setTableState(TableState.DEFAULT);
        } else {
          setTableState(TableState.EMPTY);
        }
      }
    }, [JSON.stringify(modelListData)]);

    return (
      <div id={id} className={className} style={style}>
        <ModelIndexProvider model={model} tableState={tableState}>
          <TableProvider
            fields={fields}
            data={modelListData ?? []}
            actionsConfig={actionsConfig}
          >
            {/* <ModelIndexTitle style={{ fontSize: '40px' }}>{humanizeText(modelName)}</ModelIndexTitle> */}

            {children === undefined ? (
              <>
                <ModelIndexTable />
              </>
            ) : (
              children
            )}
          </TableProvider>
        </ModelIndexProvider>
      </div>
    );
  },
  {
    Title: ModelIndexTitle,
    Tools: ModelIndexTools,
    Table: ModelIndexTable,
    Pagination: ModelIndexPagination,
  },
);
