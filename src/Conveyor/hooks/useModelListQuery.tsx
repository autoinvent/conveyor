import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { TableView } from '@/types';
import { camelToSnakeCase } from '@/utils';

import { getPrimaryKeys, getQueryFields } from '../utils';

import { useConveyor } from '../Conveyor/useConveyor';

export interface UseModelListQueryProps {
  model: string;
  fieldNames: string[];
  enabled?: boolean;
  tableView?: TableView;
  queryKeys?: string[];
}

export const useModelListQuery = ({
  model,
  fieldNames,
  tableView = {},
  enabled,
  queryKeys,
}: UseModelListQueryProps): UseQueryResult<any, Error> & { operationName: string } => {
  const queryName = camelToSnakeCase(model);
  const operationName = `${queryName}_list`;
  const {
    selected: { fetcher, models },
  } = useConveyor((state) => state);
  const primaryKeys = getPrimaryKeys(models[model]);
  const requestedFields = getQueryFields(model, fieldNames, models).join(' ');
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
    queryKey: queryKeys ?? [model, operationName, tableView],
    queryFn: () => {
      return fetcher({ operationName, document, variables: tableView });
    },
  });
  return { ...query, operationName };
};
