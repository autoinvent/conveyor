import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'

import { useAlerts } from '@/Alerts';
import { humanizeText } from '@/utils';

import { useConveyorState } from '../useConveyorState'
import { useModelListQuery } from '../useModelListQuery'
import { ModelIndex } from '@/ModelIndex/ModelIndex';

export const ModelIndexPage = () => {
    const model: string = useParams({ from: '/$model', select: (params) => params.model })
    if (!model) throw new Error('Model was not specified in url')
    const { addAlert } = useAlerts();
    const [models] = useConveyorState((state) => state.models)
    const modelIndexId = `${model}-index-page`
    const modelDisplayName = humanizeText(model)
    const fields = models[model]?.fields ?? {}
    const updatableFields = Object.keys(fields).filter((field) => fields[field].update)
    const {
        data,
        error,
        isLoading,
        isError,
        isSuccess,
        operationName,
    } = useModelListQuery({ model, fields: updatableFields });

    useEffect(() => {
        if (isLoading === false) {
            if (isSuccess) {
                addAlert({
                    content: `Successfully fetched ${modelDisplayName} list!`,
                    expires: 3000,
                });
                data[operationName].items;
            } else if (isError) {
                addAlert({
                    content: `Failed to fetch ${modelDisplayName} list: ${error}`,
                });
            }
        }
    }, [data, isLoading, isSuccess, isError]);

    return (
        <ModelIndex model={model} fields={updatableFields} data={data ?? []}>
            <ModelIndex.Title />
        </ModelIndex>
    )
}