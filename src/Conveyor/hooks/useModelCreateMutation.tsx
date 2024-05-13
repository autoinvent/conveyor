import { useMutation, useQueryClient } from '@tanstack/react-query';

import { DataType } from '@/Data';
import { camelToSnakeCase } from '@/utils';

import { getCreateFieldParams } from '../utils';
import { useConveyor } from '../Conveyor/useConveyor';

export interface UseModelCreateMutationProps {
  model: string;
  fieldNames: string[];
  mutationKeys?: string[];
}

export const useModelCreateMutation = ({
  model,
  fieldNames,
  mutationKeys,
}: UseModelCreateMutationProps) => {
  const queryClient = useQueryClient();
  const queryName = camelToSnakeCase(model);
  const operationName = `${queryName}_create`;
  const {
    selected: { fetcher, models },
  } = useConveyor((state) => state);
  const fieldParams = getCreateFieldParams(model, fieldNames, models);
  const document = `
        mutation (${fieldParams.inputVariables.join(',')}) {
            ${operationName} (${fieldParams.queryArgs.join(',')}) {
                id
            }
        }
    `;
  const mutation = useMutation({
    mutationKey: mutationKeys ?? [model, operationName],
    mutationFn: (createValues: DataType) => {
      return fetcher({ operationName, document, variables: createValues });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });
  return { ...mutation, operationName };
};
