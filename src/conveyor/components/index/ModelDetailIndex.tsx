import { useCallback, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from 'graphql-request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, Toast, Container, Row } from 'react-bootstrap';

import {
  DataManagerProps,
  DetailField,
  RelFieldOption,
  DetailFieldValue,
} from '../../commons/types';
import { CREATE_MODE } from '../../commons/constants';
import { getAllModelNames, toModelListName, typeToModelName } from '../../schema';
import ModelDetails from '../ModelDetails';

interface DetailValues {
  detailFields: DetailField[];
  relFieldOptions: Record<string, RelFieldOption[]>;
}

function ModelDetailIndex({ schema, gqlFetcher }: DataManagerProps) {
  if (!schema) throw new Error();
  const { modelName: paramModelName, modelId: currentModelId } = useParams();
  const currentModelName = typeToModelName(schema, paramModelName);
  if (!currentModelName) throw new Error();
  const currentModel = schema.models.find((model) => model.name === currentModelName);
  if (!currentModel) throw new Error();
  const currentModelListName = toModelListName(currentModelName);

  // Mapping between singular and plural model names to its singular form
  const allModelNames = getAllModelNames(schema);
  const relTypesToLink = useMemo(() => {
    const mapper: Record<string, string> = {};
    allModelNames.forEach((modelName) => {
      mapper[modelName] = modelName;
      mapper[toModelListName(modelName)] = modelName;
    });
    return mapper;
  }, [allModelNames]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toggleShowToast = () => setShowToast(!showToast);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryModelDetail = useCallback(async () => {
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
        fieldType: relField || (field.type as string),
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
    const currentModelQuery =
      currentModelId !== CREATE_MODE
        ? `($id: ID!){
      ${currentModelName}(id: $id) {
        result {
          id ${queryModelFields.join(' ')}
        }
      }`
        : '{ ';
    const query = gql`
      query model${currentModelQuery}
        ${
          queryRelTypeList.join(' ')
            ? queryRelTypeList.join(' ')
            : `${currentModelListName} {result { id } }`
        }
      }
    `;
    const param = {
      request: query,
      variables: {
        id: currentModelId,
      },
    };

    return gqlFetcher(param).then((response) => {
      const emptyModel: Record<string, null | string[]> = {};
      currentFields.forEach((field) => {
        let defaultVal = null;
        if (field.fieldLink) {
          // Plural rel type
          if (field.fieldLink !== field.fieldType) {
            defaultVal = [];
          }
        }
        emptyModel[field.fieldName] = defaultVal;
      });

      const data =
        currentModelId === CREATE_MODE ? emptyModel : response[currentModelName].result;
      const detailFields = currentFields.map((field) => {
        const detailField: DetailField = field;
        const dataFieldName = field.fieldLink ? field.fieldType : field.fieldName;
        const dataFieldValue = data[dataFieldName];
        if (!field.fieldLink) {
          detailField.fieldValue = dataFieldValue?.toString() ?? '';
        } else if (field.fieldLink === field.fieldType) {
          detailField.fieldValue = {
            value: dataFieldValue ? String(dataFieldValue.id) : null,
            label: dataFieldValue?.name ?? 'None',
          };
        } else {
          detailField.fieldValue = dataFieldValue.map((val: any) => ({
            value: String(val.id),
            label: val.name,
          }));
        }
        return detailField;
      });

      const relFieldOptions: Record<string, RelFieldOption[]> = {};
      relTypeList.forEach((relType) => {
        const relListName = toModelListName(relTypesToLink[relType]);
        const modelList = response[relListName].result;
        relFieldOptions[relType] = modelList.map((model: Record<string, string>) => ({
          value: String(model.id),
          label: model.name,
        }));
      });

      return { detailFields, relFieldOptions };
    });
  }, [
    gqlFetcher,
    currentModelName,
    currentModelListName,
    currentModel,
    currentModelId,
    relTypesToLink,
  ]);
  const { error: errModelDetailData, data: modelDetails } = useQuery<
    DetailValues,
    Error
  >(['model', currentModelListName, currentModelId], queryModelDetail);

  // Create Model
  const createModelDetail = (formData: Record<string, DetailFieldValue>) => {
    // Parses form values to appropriate values for the db
    const formKeys = Object.keys(formData);
    const modelData: Record<string, string | boolean | (string | null)[] | null> = {};
    formKeys.forEach((formKey) => {
      if (formKey === 'id') return;
      const formValue = formData[formKey];
      // formValue is a value for a relational type
      if (typeof formValue === 'object') {
        // Plural relational type
        if (Array.isArray(formValue)) {
          const relValueArr = formValue.map((val) => val.value);
          modelData[formKey] =
            typeToModelName(schema, formKey) === formKey ? relValueArr[0] : relValueArr;
        } else {
          modelData[formKey] = formValue.value;
        }
      } else {
        modelData[formKey] = (formValue as string | boolean | null) || null;
      }
    });
    // Constructs graphQL mutation
    const modelSuffix =
      currentModelName.charAt(0).toUpperCase() + currentModelName.slice(1);
    const mutation = gql`
      mutation CreateModel($input: ${modelSuffix}InputRequired!) {
        create${modelSuffix}(input: $input) {
          result {
            name
          }
        }
      }
    `;
    const param = {
      request: mutation,
      variables: {
        input: modelData,
      },
    };
    return gqlFetcher(param).then((response) => {
      // TODO: Handle response of creations.
    });
  };
  const { mutate: mutationCreate, isLoading: creating } = useMutation(
    (createdDetail: Record<string, DetailFieldValue>) =>
      createModelDetail(createdDetail),
    {
      onSuccess: () => {
        toggleShowToast();
        setToastMessage(`Successfully created ${currentModelName}!`);
        navigate(-1);
      },
      onError: () => {
        toggleShowToast();
        setToastMessage(`Failed to create ${currentModelName}!`);
      },
    },
  );

  // Update Model
  const updateModelDetail = (formData: Record<string, DetailFieldValue>) => {
    // Parses form values to appropriate values for the db
    const formKeys = Object.keys(formData);
    const modelData: Record<string, string | boolean | (string | null)[] | null> = {};
    formKeys.forEach((formKey) => {
      const formValue = formData[formKey];
      // formValue is a value for a relational type
      if (typeof formValue === 'object') {
        // Plural relational type
        if (Array.isArray(formValue)) {
          const relValueArr = formValue.map((val) => val.value);
          modelData[formKey] =
            typeToModelName(schema, formKey) === formKey ? relValueArr[0] : relValueArr;
        } else {
          modelData[formKey] = formValue.value;
        }
      } else {
        modelData[formKey] = (formValue as string | boolean | null) || null;
      }
    });
    // Constructs graphQL mutation
    const modelSuffix =
      currentModelName.charAt(0).toUpperCase() + currentModelName.slice(1);
    const mutation = gql`
      mutation UpdateModel($id: ID!, $input: ${modelSuffix}Input!) {
        update${modelSuffix}(id: $id, input: $input) {
          result {
            name
          }
        }
      }
    `;
    const param = {
      request: mutation,
      variables: {
        id: currentModelId,
        input: modelData,
      },
    };
    return gqlFetcher(param).then((response) => {
      // TODO: Handle response of updates.
    });
  };
  const { mutate: mutationUpdate, isLoading: updating } = useMutation(
    (updatedDetail: Record<string, DetailFieldValue>) =>
      updateModelDetail(updatedDetail),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['model', currentModelListName]);
        toggleShowToast();
        setToastMessage(`Successfully updated ${currentModelName}!`);
      },
      onError: () => {
        toggleShowToast();
        setToastMessage(`Failed to update ${currentModelName}!`);
      },
    },
  );

  const deleteModelDetail = () => {
    // Constructs graphQL mutation
    const modelSuffix =
      currentModelName.charAt(0).toUpperCase() + currentModelName.slice(1);
    const mutation = gql`
      mutation DeleteModel($id: ID!) {
        delete${modelSuffix}(id: $id) {
          result {
            name
          }
        }
      }
    `;
    const param = {
      request: mutation,
      variables: {
        id: currentModelId,
      },
    };
    return gqlFetcher(param).then((response) => {
      // TODO: Handle response of updates.
    });
  };
  const { mutate: mutationDelete, isLoading: deleting } = useMutation(
    () => deleteModelDetail(),
    {
      onSuccess: () => {
        toggleShowToast();
        setToastMessage(`Successfully deleted ${currentModelName}!`);
        navigate(-1);
      },
      onError: () => {
        toggleShowToast();
        setToastMessage(`Failed to delete ${currentModelName}!`);
      },
    },
  );

  if (errModelDetailData) throw new Error(errModelDetailData.message);

  return modelDetails?.detailFields ? (
    <Container>
      <Row>
        <h3>{currentModelName}</h3>
      </Row>
      <Row>
        <ModelDetails
          relFieldOptions={modelDetails.relFieldOptions}
          detailFields={modelDetails.detailFields}
          loading={updating}
          mode={currentModelId ?? ''}
          createData={(createdDetail: Record<string, DetailFieldValue>) =>
            mutationCreate(createdDetail)
          }
          updateData={(updatedDetail: Record<string, DetailFieldValue>) =>
            mutationUpdate(updatedDetail)
          }
          deleteData={() => {
            mutationDelete();
          }}
        />
      </Row>
      <ToastContainer position="top-center">
        <Toast autohide show={showToast} delay={2000} onClose={toggleShowToast}>
          <Toast.Header>{toastMessage}</Toast.Header>
        </Toast>
      </ToastContainer>
    </Container>
  ) : (
    <h3>Loading...</h3>
  );
}

export default ModelDetailIndex;
