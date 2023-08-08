import { InputTypes } from "../components/commons/FlexibleInput";
import { GQLQueryAction } from "../hooks/useGQLQuery";
import { GQLMutationAction } from "../hooks/useGQLMutation";
import { ErrorMessage } from "../enums";
import { FieldData } from "../types";

import { lowerCaseFirst, upperCaseFirst } from "./common";

const gqlDocumentRecursion: any = (
  primaryKey: string,
  fields: string[],
  fieldsData?: Record<string, FieldData>
) => {
  return fields
    .map((field) => {
      const related = fieldsData?.[field]?.related;
      if (related) {
        return `${field} { ${gqlDocumentRecursion(
          primaryKey,
          related.fields,
          related?.fieldsData
        )} }`;
      }
      return field;
    })
    .concat([primaryKey])
    .join(" ");
};

export const getGQLDocument = (
  actionType: GQLQueryAction | GQLMutationAction,
  modelName: string,
  primaryKey: string,
  fields: string[],
  fieldsData?: Record<string, FieldData>
) => {
  const action = getGQLAction(actionType, modelName);
  const typeArgs =
    fields.map((field) => {
      let type = fieldsData?.[field]?.type;
      return `$${field}: ${type}`;
    }) ?? [];
  const fieldArgs = fields.map((field) => `${field}: $${field}`) ?? [];
  const responseQuery = fields
    .map((field) => {
      const related = fieldsData?.[field]?.related;
      if (related) {
        const recursedFields = gqlDocumentRecursion(
          primaryKey,
          related.fields,
          related?.fieldsData
        );
        return `${field} { ${recursedFields} }`;
      }
      return field;
    })
    .concat([primaryKey])
    .join(" ");

  switch (actionType) {
    case GQLQueryAction.MODEL_ITEM: {
      return `
        query ($${primaryKey}: ${fieldsData?.[primaryKey].type}) {
          ${action} (id: $id) {
            ${responseQuery}
          }
        }
      `;
    }
    case GQLQueryAction.MODEL_LIST: {
      return `
        query ($sort: [String!], $page: Int, $per_page: Int) {
          ${action} (sort: $sort, page: $page, per_page: $per_page) {
            total
            items {
              ${responseQuery}
            }
          }
        }
      `;
    }
    case GQLMutationAction.MODEL_UPDATE:
    case GQLMutationAction.MODEL_CREATE: {
      return `
        mutation (${typeArgs.join(", ")}) {
          ${action} (${fieldArgs.join(", ")}) { ${responseQuery} }
        }
      `;
    }
    case GQLMutationAction.MODEL_DELETE: {
      return `
        mutation (${typeArgs.join(", ")}) {
          ${action} (${fieldArgs.join(", ")})
        }
      `;
    }
    default: {
      throw Error(`${ErrorMessage.GQL_ACTION_DNE} ${action}`);
    }
  }
};

export const getGQLAction = (
  actionType: GQLQueryAction | GQLMutationAction,
  modelName: string
) => {
  const queryName = modelToQueryName(modelName);
  return `${queryName}_${actionType}`;
};

export const queryToModelName = (queryName: string) => {
  return upperCaseFirst(queryName);
};

export const modelToQueryName = (modelName: string) => {
  return lowerCaseFirst(modelName);
};

export const modelToModelListName = (modelName: string) => {
  if (!modelName) return "";
  return `${modelName}_list`;
};

export const modelListToModelName = (modelListName: string) => {
  if (!modelListName) return "";
  return modelListName.slice(0, -5);
};

export const getAvailableKeys = (
  fields: string[],
  keyFallbacks: string[],
  maxKeys: number = 2
) => {
  const keys: string[] = keyFallbacks.filter((key) => fields.includes(key));
  return keys.slice(0, maxKeys);
};

export const getBaseGQLType = (type: string) => {
  return type.replaceAll(/[!\[\]]/g, "");
};

export const gqlTypeToFlexType = (type: string) => {
  const baseGQLType = getBaseGQLType(type);
  switch (baseGQLType) {
    case "Int":
      return InputTypes.NUMBER;
    case "Boolean":
      return InputTypes.BOOLEAN;
    case "DateTime":
      return InputTypes.DATETIME;
    case "String":
      return InputTypes.TEXT;
    default:
      return InputTypes.SELECT;
  }
};
