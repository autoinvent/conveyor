// import { useContext, useCallback } from 'react';

// import { Field, Model } from '@/types';
// import {
//   camelToSnakeCase,
//   getFieldName,
//   getModelPrimaryKey,
//   getModelName,
// } from '@/utils';

// import { ConveyorContext } from './Conveyor';

// export const useModelListQuery = (model: Model, fields: Field[]) => {
//   const { useMQLQuery } = useContext(ConveyorContext);
//   const modelName = getModelName(model);
//   const primaryKey = getModelPrimaryKey(model);
//   const fieldNames = fields.map((field) => getFieldName(field));
//   const operationName = `${camelToSnakeCase(modelName)}_list`;
//   const document = `
//         query ($filter: [[FilterItem!]!], $sort: [String!], $page: Int, $per_page: Int) {
//             ${operationName} (filter: $filter, sort: $sort, page: $page, per_page: $per_page) {
//                 total
//                 items {
//                     ${primaryKey.name} ${fieldNames.join(' ')}
//                 }              
//             }
//         }
//     `;
//   const mqlRequest = useMQLQuery({ document, operationName });
//   // return mqlRequest
//   return useCallback(
//     () =>
//       mqlRequest().then((response) => {
//         return response[operationName];
//       }),
//     [mqlRequest],
//   );
// };
