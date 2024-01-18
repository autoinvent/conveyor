import { ReactNode } from 'react'

import { ITEM_QUERY, NON_NULL_TYPE, LIST_TYPE, CREATE_MUTATION } from '../constants';
import {
  ConveyorProvider,
  ConveyorContextType,
} from '../contexts/ConveyorContext';
import ModelIndex from '../components/ModelIndex';
import ConveyorNavbar from './ConveyorNavbar';
import { ModelField } from '../../aaconveyor/types';

const INTROSPECTION_QUERY = `
{
  __schema {
    queryType {
      fields { name type {name} }
  	}
    
    mutationType {
      fields {
        name
        type { ofType {name} }
        args { 
          name
          type { 
            kind
            name
            ofType {
              kind
              name
              ofType { kind name }
            }
          } 
        }
      }
    }

    types {
    	name
      kind
      fields {
        name 
        type { 
          name
          kind 
          ofType {
            name 
            kind 
            ofType {
              name kind ofType { kind name }
            }
          } 
        }
      }
  	}
  }
}
`;

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
  let typeStr = typeArray?.[0]
  if (typeStr) {
    if (typeStr === NON_NULL_TYPE) {
      typeStr = `${recurseTypeArrayToTypeString(typeArray.slice(1))}!`
    } else if (typeStr === LIST_TYPE) {
      typeStr = `[${recurseTypeArrayToTypeString(typeArray.slice(1))}]`
    }
  }
  return typeStr
};

interface ConveyorProps extends ConveyorContextType {
  children?: ReactNode
}

const Conveyor = ({
  useGQLQueryResponse,
  useGQLMutationRequest,
}: ConveyorProps) => {
  //TODO: organize later
  const introspection = useGQLQueryResponse({ document: INTROSPECTION_QUERY });
  // *Constructs the Conveyor models object from the introspection
  // Extracts all of the models that can be queried
  const conveyorModels =
    introspection.data?.__schema.queryType.fields
      .filter(({ name }: QueryOperation) => name.endsWith(ITEM_QUERY))
      .map(({ type }: QueryOperation) => [type.name])
      .reduce(
        (conveyorModels: ConveyorModels, modelName: string) =>
          Object.assign(conveyorModels, { [modelName]: { relationships: {} } }),
        {},
      ) ?? {};
  // Finds which field is a relational field
  introspection.data?.__schema.types.map((type: any) => {
    const modelName = type.name
    if (type.kind === "OBJECT" && conveyorModels[modelName]) {
      type.fields.forEach((field: any) => {
        const typeArray = recurseTypeObjectToTypeArray(field.type)
        const potentialModelName = typeArray.pop()
        if (potentialModelName && conveyorModels[potentialModelName]) {
          conveyorModels[modelName]['relationships'][field.name] = potentialModelName
        }
      })
    }
  })
  // Extracts the fields that can be passed to the model's mutators
  introspection.data?.__schema.mutationType.fields.forEach(
    ({ type, name, args }: MutationOperation) => {
      const modelName = type.ofType.name;
      if (conveyorModels?.[modelName])
        conveyorModels[modelName][name] = args.map((arg) => {
          const field: ModelField = {
            name: arg.name,
            type: recurseTypeArrayToTypeString(
              recurseTypeObjectToTypeArray(arg.type),
            ),
          }
          const relationship = conveyorModels[modelName].relationships[field.name]
          if (relationship) {
            field.relationship = { many: field.type.includes('['), modelName: relationship }
          }
          return field
        });
    },
  );

  console.log(conveyorModels);
  return (
    <ConveyorProvider value={{ useGQLQueryResponse, useGQLMutationRequest }}>
      <ConveyorNavbar modelNames={['Task']} />
      {conveyorModels?.Task &&
        <ModelIndex modelName='Task' fields={conveyorModels.Task.task_update} />
      }
    </ConveyorProvider>
  );
};

export default Conveyor;
