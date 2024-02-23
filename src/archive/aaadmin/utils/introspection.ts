import {
  ITEM_QUERY,
  NON_NULL_TYPE,
  LIST_TYPE,
  CREATE_MUTATION,
  UPDATE_MUTATION,
} from '../constants/common';
import { RelationType } from '../../aaconveyor/types';
import { getFieldName } from '../../aaconveyor/utils';

interface Type {
  kind: string;
  name: string | null;
  ofType?: Type | null;
}

interface ModelType {
  name: string;
  kind: string;
  fields: { name: string; type: Type }[];
}

interface QueryOperation {
  name: string;
  type: { name: string };
}

interface MutationOperation {
  name: string;
  type: { ofType: { name: string } };
  args: { name: string; type: Type }[];
}

interface Field {
  name: string;
  type: string | RelationType;
  required?: boolean;
  editable?: boolean;
}

interface ConveyorModels {
  [ModelName: string]: {
    fields: Record<string, Field>;
    index: Field[];
    detail: Field[];
    create: Field[];
  };
}

const recurseTypeObjectToTypeArray = (type: Type | null | undefined) => {
  let typeArray: string[] = [];
  if (type) {
    if (type.name === null) {
      typeArray.push(type.kind);
      typeArray = typeArray.concat(recurseTypeObjectToTypeArray(type.ofType));
    } else {
      typeArray.push(type.name);
    }
  }
  return typeArray;
};

const recurseTypeArrayToTypeString = (typeArray: string[]) => {
  let typeStr = typeArray?.[0];
  if (typeStr) {
    if (typeStr === NON_NULL_TYPE) {
      typeStr = `${recurseTypeArrayToTypeString(typeArray.slice(1))}!`;
    } else if (typeStr === LIST_TYPE) {
      typeStr = `[${recurseTypeArrayToTypeString(typeArray.slice(1))}]`;
    }
  }
  return typeStr;
};

// *Constructs the Conveyor models object from the introspection
export const extractModelsFromIntrospection = (introspection: any) => {
  // Extracts all of the models that can be queried
  const conveyorModels: ConveyorModels =
    introspection?.__schema.queryType.fields
      .filter(({ name }: QueryOperation) => name.endsWith(ITEM_QUERY))
      .map(({ type }: QueryOperation) => [type.name])
      .reduce(
        (conveyorModels: ConveyorModels, modelName: string) =>
          Object.assign(conveyorModels, {
            [modelName]: { fields: {}, index: {}, detail: {}, create: {} },
          }),
        {},
      ) ?? {};
  // Extracts the fields for each Model
  introspection?.__schema.types.map((type: ModelType) => {
    const modelName = type.name;
    if (type.kind === 'OBJECT' && conveyorModels[modelName]) {
      type.fields.forEach((field) => {
        const fieldName = field.name;
        const typeArray = recurseTypeObjectToTypeArray(field.type);
        const typeArrayLen = typeArray.length;
        const baseType = typeArray[typeArrayLen - 1];
        // TODO: Error handle baseType being trash values
        if (baseType) {
          const idType = 'Int'; // TODO: may be unecessary if ID type is used.
          const nonNullType = typeArray[typeArrayLen - 2];
          const listType = typeArray[typeArrayLen - 3];
          const fieldType = conveyorModels[baseType]
            ? {
                modelName: baseType,
                many:
                  (nonNullType === NON_NULL_TYPE && listType === LIST_TYPE) ||
                  nonNullType === LIST_TYPE,
                type: idType,
              }
            : baseType;
          const fieldRequired = nonNullType === NON_NULL_TYPE;
          conveyorModels[modelName].fields[fieldName] = {
            name: fieldName,
            type: fieldType,
            required: fieldRequired,
          };
        }
      });
    }
  });
  // Extracts the fields array for the index and create pages
  introspection?.__schema.mutationType.fields.forEach(
    ({ type, name, args }: MutationOperation) => {
      const modelName = type.ofType.name;
      if (conveyorModels?.[modelName]) {
        const isUpdate = name.endsWith(UPDATE_MUTATION);
        if (isUpdate || name.endsWith(CREATE_MUTATION)) {
          conveyorModels[modelName][isUpdate ? 'index' : 'create'] = args.map(
            (arg) => {
              const fieldName = arg.name;
              const typeArray = recurseTypeObjectToTypeArray(arg.type);
              const typeArrayLen = typeArray.length;
              const baseType = typeArray[typeArrayLen - 1];

              const field = JSON.parse(
                JSON.stringify(conveyorModels[modelName].fields[fieldName]),
              );
              if (typeof field.type === 'object') field.type.type = baseType;
              field.editable = true;
              return field;
            },
          );
        }
      }
    },
  );

  Object.keys(conveyorModels).forEach((modelName) => {
    const indexFields = Object.fromEntries(
      conveyorModels[modelName].index.map((field) => [
        getFieldName(field),
        field,
      ]),
    );
    conveyorModels[modelName].detail = Object.entries(
      conveyorModels[modelName].fields,
    ).map(([fieldName, field]) => {
      return Object.assign(field, indexFields[fieldName]);
    });
  });

  return conveyorModels;
};
