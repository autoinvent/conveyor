import { ITEM_QUERY, NON_NULL_TYPE, LIST_TYPE } from '../constants/common';
import { Field } from '../../aaconveyor/types';

interface Type {
  kind: string;
  name: string | null;
  ofType?: Type | null;
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

interface ConveyorModels {
  [ModelName: string]: {};
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
  const conveyorModels =
    introspection?.__schema.queryType.fields
      .filter(({ name }: QueryOperation) => name.endsWith(ITEM_QUERY))
      .map(({ type }: QueryOperation) => [type.name])
      .reduce(
        (conveyorModels: ConveyorModels, modelName: string) =>
          Object.assign(conveyorModels, { [modelName]: { relationships: {} } }),
        {},
      ) ?? {};
  // Finds which field is a relational field
  introspection?.__schema.types.map((type: any) => {
    const modelName = type.name;
    if (type.kind === 'OBJECT' && conveyorModels[modelName]) {
      type.fields.forEach((field: any) => {
        const typeArray = recurseTypeObjectToTypeArray(field.type);
        const potentialModelName = typeArray.pop();
        if (potentialModelName && conveyorModels[potentialModelName]) {
          conveyorModels[modelName].relationships[field.name] =
            potentialModelName;
        }
      });
    }
  });
  // Extracts the fields that can be passed to the model's mutators
  introspection?.__schema.mutationType.fields.forEach(
    ({ type, name, args }: MutationOperation) => {
      const modelName = type.ofType.name;
      if (conveyorModels?.[modelName])
        conveyorModels[modelName][name] = args.map((arg) => {
          const field: Field = {
            name: arg.name,
            type: recurseTypeArrayToTypeString(
              recurseTypeObjectToTypeArray(arg.type),
            ),
          };
          const relationship =
            conveyorModels[modelName].relationships[field.name];
          if (relationship) {
            field.relationship = {
              many: field.type.includes('['),
              modelName: relationship,
            };
          }
          return field;
        });
    },
  );
  return conveyorModels;
};
