import { Field } from '../../aaconveyor/types';
import {
  getFieldName,
  getFieldRelationship,
  getFieldType,
} from '../../aaconveyor/utils';
import { ITEM_QUERY } from '../constants/common';

export const modelToQueryName = (modelName: string) => {
  return modelName.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

export const generateOperationName = (modelName: string, operation: string) => {
  return `${modelToQueryName(modelName)}${operation}`;
};

export const generateGQLQueryDocument = (
  modelName: string,
  fields: Field[],
  query: string,
) => {
  const queryOperation = generateOperationName(modelName, query);
  const args =
    query === ITEM_QUERY
      ? [{ name: 'id', type: 'Int!' }]
      : [
          { name: 'filter', type: '[[FilterItem!]!]' },
          { name: 'sort', type: '[String!]' },
          { name: 'page', type: 'Int' },
          { name: 'per_page', type: 'Int' },
        ];
  const variableDefs = args
    .map((arg) => `$${getFieldName(arg)}:${getFieldType(arg)}`)
    .join();
  const queryArgs = args
    .map((arg) => `${getFieldName(arg)}: $${getFieldName(arg)}`)
    .join();
  const selectionSet = fields
    .map((field) => {
      return getFieldRelationship(field)
        ? `${getFieldName(field)} { id }`
        : getFieldName(field);
    })
    .join(' ');
  return `
        query(${variableDefs}) {
            ${queryOperation}(${queryArgs}) {
                ${
                  query === ITEM_QUERY
                    ? selectionSet
                    : `items { ${selectionSet} } total`
                }
            }
        }
    `;
};

export const generateGQLMutationDocument = (
  modelName: string,
  args: Field[],
  mutation: string,
) => {
  const mutationOperation = generateOperationName(modelName, mutation);
  const variableDefs = args
    .map((arg) => `$${getFieldName(arg)}:${getFieldType(arg)}`)
    .join();
  const mutationArgs = args
    .map((arg) => `${getFieldName(arg)}: $${getFieldName(arg)}`)
    .join();
  const selectionSet = args.map((arg) => getFieldName(arg)).join(' ');
  return `
        mutation(${variableDefs}) {
            ${mutationOperation}(${mutationArgs}) {
                ${selectionSet}
            }
        }
    `;
};
