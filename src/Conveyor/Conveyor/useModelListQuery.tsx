import { useQuery } from '@tanstack/react-query';

import { camelToSnakeCase } from '@/utils';

import { getPrimaryKeys, getQueryFields } from '../utils';

import { useConveyor } from './useConveyor';

export const useModelListQuery = ({
  model,
  fields,
  enabled,
}: { model: string; fields: string[]; enabled?: boolean }) => {
  const queryName = camelToSnakeCase(model);
  const operationName = `${queryName}_list`;
  const {
    selected: { fetcher, models },
  } = useConveyor((state) => state);
  const primaryKeys = getPrimaryKeys(models[model]);
  const requestedFields = getQueryFields(model, fields, models).join(' ');
  const document = `
        query ($filter: [[FilterItem!]!], $sort: [String!], $page: Int, $per_page: Int) {
            ${operationName} (filter: $filter, sort: $sort, page: $page, per_page: $per_page) {
                total
                items {
                    ${primaryKeys.join(' ')} ${requestedFields}
                }
            }
        }
    `;
  const query = useQuery({
    enabled,
    queryKey: [model, operationName, document],
    queryFn: () => {
      return fetcher({ operationName, document });
    },
  });
  return { ...query, operationName };
};
