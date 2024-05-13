import { useMutation } from '@tanstack/react-query';

import { useConveyor } from '../Conveyor/useConveyor';
import { ID } from '@/types';

export interface useModelCheckDeleteMutationProps {
  model: string;
}

export const useModelCheckDeleteMutation = ({
  model,
}: useModelCheckDeleteMutationProps) => {
  const operationName = `check_delete`;
  const {
    selected: { fetcher },
  } = useConveyor((state) => state);
  const document = `
        query ($type: String!, $id: ID!) {
            ${operationName} (type: $type, id: $id) {
              affected {
                type id value extra
              }
              deleted {
                type id value extra
              }
              prevented {
                type id value extra
              }
            }
        }
    `;
  const mutation = useMutation({
    mutationFn: (id: ID) => {
      return fetcher({
        operationName,
        document,
        variables: { type: model, id },
      });
    },
  });
  return { ...mutation, operationName };
};
