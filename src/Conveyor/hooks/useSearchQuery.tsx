import { useQuery } from '@tanstack/react-query';

import { useConveyor } from '../Conveyor/useConveyor';

export interface UseSearchQueryProps {
  searchValue: String
  enabled?: boolean;
}

export const useSearchQuery = ({
  searchValue,
  enabled,
}: UseSearchQueryProps) => {
  const operationName = "search";
  const { selected: fetcher } = useConveyor((state) => state.fetcher);
  const document = `
        query ($value: String!) {
            ${operationName} (value: $value) {
                type
                id
                value
                extra
            }
        }
    `;
  const query = useQuery({
    enabled,
    queryKey: [operationName, searchValue],
    queryFn: () => {
      return fetcher({ operationName, document, variables: { value: searchValue } });
    },
  });
  return { ...query, operationName };
};
