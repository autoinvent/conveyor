import { useEffect, useState } from 'react';
import { Store } from '@tanstack/react-store';

import { useAlerts } from '@/Alerts';
import { useModelListQuery } from '@/Conveyor';
import { useIsFirstRender } from '@/hooks';
import { CommonProps, FetchHandler, WrapperProp, DataType } from '@/types';
import { humanizeText } from '@/utils';

import { ModelIndexTable } from './ModelIndexTable';
import { ModelIndexTitle } from './ModelIndexTitle';
import {
  ModelIndexStore,
  ModelIndexStoreContext,
} from './ModelIndexStoreContext';
import { ActionsConfig } from './types';

export interface ModelIndexProps extends CommonProps, WrapperProp {
  model: string;
  fields: string[];
  data?: DataType[] | undefined;
  onModelListQuerySuccess?: FetchHandler['onSuccess'];
  onModelListQueryError?: FetchHandler['onError'];
  actionsConfig?: ActionsConfig;
}

export const ModelIndex = Object.assign(
  ({
    model,
    fields,
    data,
    children,
    onModelListQuerySuccess,
    onModelListQueryError,
    actionsConfig,
    id,
    className,
    style,
  }: ModelIndexProps) => {
    const isFirstRender = useIsFirstRender();
    const { addAlert } = useAlerts();
    const [modelIndexStore] = useState(
      new Store<ModelIndexStore>({
        model,
        fields,
        data: data ?? [],
        actionsConfig,
      }),
    );
    const {
      data: queryData,
      error,
      isLoading,
      isError,
      isSuccess,
      operationName,
    } = useModelListQuery({ model, fields, enabled: data === undefined });
    const modelDisplayName = humanizeText(model);

    useEffect(() => {
      if (!isFirstRender.current) {
        modelIndexStore.setState((state) => {
          return {
            ...state,
            model,
          };
        });
      }
    }, [model]);

    useEffect(() => {
      if (!isFirstRender.current) {
        modelIndexStore.setState((state) => {
          return {
            ...state,
            fields,
          };
        });
      }
    }, [fields]);

    useEffect(() => {
      if (!isFirstRender.current) {
        modelIndexStore.setState((state) => {
          return {
            ...state,
            data: data ?? [],
          };
        });
      }
    }, [data]);

    useEffect(() => {
      if (!isFirstRender.current) {
        modelIndexStore.setState((state) => {
          return {
            ...state,
            actionsConfig,
          };
        });
      }
    }, [actionsConfig]);

    useEffect(() => {
      if (isLoading === false) {
        if (isSuccess) {
          onModelListQuerySuccess
            ? onModelListQuerySuccess(data)
            : addAlert({
              content: `Successfully fetched ${modelDisplayName} list!`,
              expires: 3000,
            });
          queryData[operationName].items;
          modelIndexStore.setState((state) => {
            return {
              ...state,
              data: queryData[operationName].items,
            };
          });
        } else if (isError) {
          onModelListQueryError
            ? onModelListQueryError(error)
            : addAlert({
              content: `Failed to fetch ${modelDisplayName} list: ${error}`,
            });
        }
      }
    }, [data, isLoading, isSuccess, isError]);

    return (
      <div id={id} className={className} style={style}>
        <ModelIndexStoreContext.Provider value={modelIndexStore}>
          {children === undefined ? (
            <>
              <ModelIndex.Title>{modelDisplayName}</ModelIndex.Title>
              <ModelIndex.Table />
            </>
          ) : (
            children
          )}
        </ModelIndexStoreContext.Provider>
      </div>
    );
  },
  {
    Title: ModelIndexTitle,
    Table: ModelIndexTable,
  },
);
