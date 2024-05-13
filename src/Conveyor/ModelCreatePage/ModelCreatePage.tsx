import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { ModelForm } from '@/ModelForm';
import { ScalarTypes } from '@/enums';
import { OnSaveProps } from '@/types';
import { humanizeText } from '@/utils';

import { useConveyor } from '../Conveyor';
import { useModelCreateMutation, useModelListMutation } from '../hooks';
import { parseMQLType } from '../utils';

export interface ModelCreatePageProps {
  model?: string;
}

export const ModelCreatePage = ({ model }: ModelCreatePageProps) => {
  const params = useParams({ from: '/$model/create' });
  const currModel: string = model ?? params.model ?? '';
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const {
    selected: { models },
  } = useConveyor((state) => {
    const { models } = state;
    return {
      models,
    };
  });

  const fields = models[currModel]?.fields ?? {};
  const creatableFieldNames = Object.keys(fields).filter((fieldName) => {
    const fieldObj = parseMQLType(fieldName, fields[fieldName].create);
    return fieldObj.type && !fieldObj.many;
  });

  const creatableFields = creatableFieldNames.map((fieldName) => ({
    ...parseMQLType(fieldName, fields[fieldName].create),
    type: fields[fieldName].baseType,
  }));
  const [defaultValues] = useState(
    Object.fromEntries(
      creatableFields.map((field) => {
        switch (field.type) {
          case ScalarTypes.STRING:
            return [field.name, ''];
          case ScalarTypes.INT:
            return [field.name, 0];
          case ScalarTypes.FLOAT:
            return [field.name, 0];
          case ScalarTypes.BOOLEAN:
            return [field.name, false];
          case ScalarTypes.DATETIME:
            return [field.name, ''];
          default:
            return [field.name, null];
        }
      }),
    ),
  );

  const { mutateAsync: selectOptionMutateAsync } = useModelListMutation();
  const onOpenFieldSelect = (model: string) => {
    return selectOptionMutateAsync(model).then((data: any) => {
      return data.items.map((item: any) => ({
        label: item.id,
        value: JSON.stringify(item.id),
      }));
    });
  };

  // Create Mutation
  const { mutateAsync: createMutateAsync } = useModelCreateMutation({
    model: currModel,
    fieldNames: creatableFieldNames,
  });

  const onCreate = async ({ data, dirtyFields }: OnSaveProps) => {
    Object.keys(data).forEach((fieldName) => {
      if (typeof data[fieldName] === 'object') {
        data[fieldName] = data[fieldName]?.id;
      }
    });
    return createMutateAsync(data)
      .then(() => {
        addAlert({
          content: `${currModel} created!`,
          className: 'success',
          expires: 2000,
        });
        navigate({ to: `/${currModel}` });
      })
      .catch((err) =>
        addAlert({
          content: `${currModel} failed to create: ${err}`,
          className: 'danger',
        }),
      );
  };

  return (
    <ModelForm
      key={currModel}
      fields={creatableFields}
      defaultValues={defaultValues}
      title={`Create ${humanizeText(currModel)}`}
      onSubmit={onCreate}
      onCancel={() => navigate({ to: '../' })}
      onOpenFieldSelect={onOpenFieldSelect}
      type="create"
    />
  );
};
