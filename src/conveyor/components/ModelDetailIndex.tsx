import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

import { DataManagerProps, DetailField, RelFieldOption } from '../commons/types';
import { getAllModelNames, toModelListName } from '../schema';
import ModelDetails from './ModelDetails';

interface DetailValues {
  detailFields: DetailField[];
  relFieldOptions: Record<string, RelFieldOption>;
}

function ModelDetail({ schema, gqlFetcher }: DataManagerProps) {
  if (!schema) throw new Error();
  const { modelName: currentModelName, modelId: currentModelId } = useParams();
  if (!currentModelName) throw new Error();
  const currentModel = schema.models.find((model) => model.name === currentModelName);
  if (!currentModel) throw new Error();
  const currentModelListName = toModelListName(currentModelName);

  const fetchGQLModelDetail = useCallback(async () => {
    // Mapping between singular and plural model names to its singular form
    const allModelNames = getAllModelNames(schema);
    const relTypesToLink: Record<string, string> = {};
    allModelNames.forEach((modelName) => {
      relTypesToLink[modelName] = modelName;
      relTypesToLink[toModelListName(modelName)] = modelName;
    });
    // A list of relational field types found in this model
    const relTypeList = new Set<string>();
    // A list fields formatted for graphQL queries
    const queryModelFields: string[] = [];
    // Parses model fields into { name, rel, required }
    // field display name
    // rel - relational field type
    // required - boolean that indicates whether the field is required
    const currentFields = currentModel.fields.map((field) => {
      const relField = typeof field.type !== 'string' ? field.type.name : '';
      if (relField) {
        relTypeList.add(relField);
        queryModelFields.push(`${relField} { id, name }`);
      } else {
        queryModelFields.push(field.name);
      }
      return {
        fieldName: field.name,
        fieldType: relField,
        fieldLink: relTypesToLink[relField] ?? '',
        fieldValue: '',
        required: field.required,
      };
    });

    // Query for each relational type for select inputs
    const queryRelTypeList: string[] = [];
    relTypeList.forEach((relType) =>
      queryRelTypeList.push(
        `${toModelListName(relTypesToLink[relType])} { result { id name } }`,
      ),
    );
    const query = gql`
      query model($id: ID!){
        ${currentModelName}(id: $id) {
          result {
            id ${queryModelFields.join(' ')}
          }
        }
        ${queryRelTypeList.join(' ')}
      }
    `;
    const param = {
      query,
      variables: {
        id: currentModelId,
      },
    };
    return gqlFetcher(param).then((response) => {
      const data = response[currentModelName].result;
      const detailFields = currentFields.map((field) => {
        const detailField: DetailField = field;
        const dataFieldName = field.fieldType ? field.fieldType : field.fieldName;
        const dataFieldValue = data[dataFieldName];
        if (!field.fieldType) {
          detailField.fieldValue = dataFieldValue ? dataFieldValue.toString() : '';
        } else {
          const relFieldValue = Array.isArray(dataFieldValue)
            ? dataFieldValue
            : [dataFieldValue];
          detailField.fieldValue = relFieldValue.map((val) => ({
            value: val.id,
            label: val.name,
          }));
        }
        return detailField;
      });

      const relFieldOptions: Record<string, RelFieldOption> = {};
      relTypeList.forEach((relType) => {
        const relListName = toModelListName(relTypesToLink[relType]);
        const modelList = response[relListName].result;
        relFieldOptions[relType] = modelList.map((model: Record<string, string>) => ({
          value: model.id,
          label: model.name,
        }));
      });

      return { detailFields, relFieldOptions };
    });
  }, [schema, gqlFetcher, currentModelName, currentModel, currentModelId]);
  const { error: errModelDetailData, data: modelDetails } = useQuery<
    DetailValues,
    Error
  >(['model', currentModelListName], fetchGQLModelDetail);

  if (errModelDetailData) throw new Error(errModelDetailData.message);

  return modelDetails?.detailFields ? (
    <ModelDetails
      relFieldOptions={modelDetails.relFieldOptions}
      detailFields={modelDetails.detailFields}
      mode=""
      updateData={() => {}}
    />
  ) : (
    <h3>ss</h3>
  );
}

export default ModelDetail;
