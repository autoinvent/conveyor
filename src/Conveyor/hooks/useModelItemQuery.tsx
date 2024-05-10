import { useQuery } from '@tanstack/react-query';

import { camelToSnakeCase } from '@/utils';

import { getPrimaryKeys, getQueryFields, getItemFieldParams } from '../utils';

import { useConveyor } from '../Conveyor/useConveyor';

export interface UseModelItemQueryProps {
  id: string;
  model: string;
  fieldNames: string[];
  enabled?: boolean;
  queryKeys?: string[];
}

export const useModelItemQuery = ({
  id,
  model,
  fieldNames,
  enabled,
  queryKeys,
}: UseModelItemQueryProps) => {
  const queryName = camelToSnakeCase(model);
  const operationName = `${queryName}_item`;
  const {
    selected: { fetcher, models },
  } = useConveyor((state) => state);
  const primaryKeys = getPrimaryKeys(models[model]);
  const fieldParams = getItemFieldParams(model, primaryKeys, models);
  const requestedFields = getQueryFields(model, fieldNames, models).join(' ');
  const document = `
        query (${fieldParams.inputVariables.join(',')}) {
            ${operationName} (${fieldParams.queryArgs.join(',')}) {
                ${primaryKeys.join(' ')} ${requestedFields}
            }
        }
    `;
  const query = useQuery({
    enabled,
    queryKey: queryKeys ?? [model, operationName],
    queryFn: () => {
      return fetcher({ operationName, document, variables: { id } });
    },
  });
  return { ...query, operationName };
};
