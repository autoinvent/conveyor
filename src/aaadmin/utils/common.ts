import { Field } from '../../aaconveyor/types';
import {
  getFieldName,
  isRelationship,
  getFieldType,
  getFieldRequired,
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
      return isRelationship(field)
        ? `${getFieldName(field)} { id }`
        : getFieldName(field);
    })
    .join(' ');
  return `
        query(${variableDefs}) {
            ${queryOperation}(${queryArgs}) {
                ${query === ITEM_QUERY
      ? `${selectionSet} id`
      : `items { ${selectionSet} id } total`
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
  // TODO: Needs to be changed to ID once implemented in magql
  const idField = { name: 'id', type: 'Int', required: true }
  if (!args.find((arg) => getFieldName(arg) === 'id')) {
    args = args.concat(idField)
  }

  const mutationOperation = generateOperationName(modelName, mutation);
  const variableDefs = args
    .map((arg) => `$${getFieldName(arg)}:${getFieldType(arg)}${getFieldRequired(arg) ? '!' : ''}`)
    .join();
  const mutationArgs = args
    .map((arg) => `${getFieldName(arg)}: $${getFieldName(arg)}`)
    .join();
  const selectionSet = args.map((arg) =>
    isRelationship(arg) ? `${getFieldName(arg)} { id }` :
      getFieldName(arg)).join(' ');
  return `
        mutation(${variableDefs}) {
            ${mutationOperation}(${mutationArgs}) {
                ${selectionSet}
            }
        }
    `;
};
