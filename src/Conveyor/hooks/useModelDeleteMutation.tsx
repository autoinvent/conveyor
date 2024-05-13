import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ID } from '@/types';
import { camelToSnakeCase } from '@/utils';

import { getDeleteFieldParams } from '../utils';
import { useConveyor } from '../Conveyor/useConveyor';

export interface useModelDeleteMutationProps {
  model: string;
  fieldNames: string[];
  mutationKeys?: string[];
}

export const useModelDeleteMutation = ({
  model,
  fieldNames,
  mutationKeys,
}: useModelDeleteMutationProps) => {
  const queryClient = useQueryClient();
  const queryName = camelToSnakeCase(model);
  const operationName = `${queryName}_delete`;
  const {
    selected: { fetcher, models },
  } = useConveyor((state) => state);
  const fieldParams = getDeleteFieldParams(model, fieldNames, models);
  const document = `
        mutation (${fieldParams.inputVariables.join(',')}) {
            ${operationName} (${fieldParams.queryArgs.join(',')})
        }
    `;
  const mutation = useMutation({
    mutationKey: mutationKeys ?? [model, operationName],
    mutationFn: (id: ID) => {
      return fetcher({ operationName, document, variables: { id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [model] });
    },
  });
  return { ...mutation, operationName };
};
