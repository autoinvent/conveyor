import { useMutation } from '@tanstack/react-query';

import { camelToSnakeCase } from '@/utils';
import { TableView } from '@/types';

import { useConveyor } from '../Conveyor/useConveyor';

export const useModelListMutation = () => {
  const {
    selected: { fetcher },
  } = useConveyor((state) => state);

  const mutation = useMutation({
    mutationFn: (model: string, tableView: TableView = {}) => {
      const queryName = camelToSnakeCase(model);
      const operationName = `${queryName}_list`;
      const document = `
      query ($filter: [[FilterItem!]!], $sort: [String!], $page: Int, $per_page: Int) {
          ${operationName} (filter: $filter, sort: $sort, page: $page, per_page: $per_page) {
              total
              items {
                  id
              }
          }
      }
  `;
      return fetcher({ operationName, document, variables: tableView }).then(
        (data: any) => data?.[operationName],
      );
    },
  });
  return { ...mutation };
};
