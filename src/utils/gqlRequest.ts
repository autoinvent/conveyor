import { GQLQueryAction } from "../hooks/useGQLQuery";
import { GQLMutationAction } from "../hooks/useGQLMutation";
import { ErrorMessage } from "../enums";
import { FieldData } from "../types";

import { modelToQueryName, modelToModelListName } from "./common";

const gqlDocumentRecursion: any = (
  fields: string[],
  fieldsData?: Record<string, FieldData>
) => {
  return fields
    .map((field) => {
      const related = fieldsData?.[field]?.related;
      if (related) {
        return `${field} { ${gqlDocumentRecursion(
          related.fields,
          related?.fieldsData
        )} }`;
      }
      return field;
    })
    .concat(["id"])
    .join(" ");
};

export const generateGQLDocument = (
  action: GQLQueryAction | GQLMutationAction,
  modelName: string,
  fields?: string[],
  fieldsData?: Record<string, FieldData>
) => {
  const queryModelName = modelToQueryName(modelName);
  const queryModelListName = modelToModelListName(queryModelName);
  const responseQuery = fields
    ?.map((field) => {
      const related = fieldsData?.[field]?.related;
      if (related) {
        const recursedFields = gqlDocumentRecursion(
          related.fields,
          related?.fieldsData
        );
        return `${field} { ${recursedFields} }`;
      }
      return field;
    })
    ?.concat(["id"])
    ?.join(" ");

  switch (action) {
    case GQLQueryAction.MODEL_ITEM: {
      return `
        query ($id: Int!) {
          ${queryModelName}_item (id: $id) {
            ${responseQuery}
          }
        }
      `;
    }
    case GQLQueryAction.MODEL_LIST: {
      return `
        query ($sort: [String!], $page: Int, $per_page: Int) {
          ${queryModelListName} (sort: $sort, page: $page, per_page: $per_page) {
            total
            items {
              ${responseQuery}
            }
          }
        }
      `;
    }
    case GQLMutationAction.MODEL_UPDATE: {
      return `
        mutation ($id: ID!, $input: ${modelName}Input!) {
          ${action}${modelName} (id: $id, input: $input) {
            result {
              ${responseQuery}
            }
          }
        }
      `;
    }
    case GQLMutationAction.MODEL_CREATE: {
      return `
        mutation () {
          ${queryModelName}_${action} (input: $input) {
            result {
              ${responseQuery}
            }
          }
        }
      `;
    }
    case GQLMutationAction.MODEL_DELETE: {
      return `
        mutation ($id: ID!) {
          ${action}${modelName} (id: $id) {
            result {
              ${responseQuery}
            }
          }
        }
      `;
    }
    default: {
      throw Error(`${ErrorMessage.GQL_ACTION_DNE} ${action}`);
    }
  }
};

export const generateGQLAction = (
  action: GQLQueryAction | GQLMutationAction,
  modelName: string
) => {
  const queryName = modelToQueryName(modelName)
  return `${queryName}_${action}`
};
