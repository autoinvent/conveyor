import { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { DataLens } from '@/Lenses';
import { ModelForm, ModelFormDeleteModal } from '@/ModelForm';
import { ID, OnSaveProps } from '@/types';
import { humanizeText } from '@/utils';

import { useConveyor } from '../Conveyor';
import {
  useModelUpdateMutation,
  useModelListMutation,
  useModelItemQuery,
  useModelCheckDeleteMutation,
  useModelDeleteMutation,
} from '../hooks';
import { parseMQLType } from '../utils';
import { DetailModelIndex } from './DetailModelIndex';
export interface ModelDetailPageProps {
  model?: string;
  id?: string;
}

export const ModelDetailPage = ({ model, id }: ModelDetailPageProps) => {
  const params = useParams({ from: '/$model/$id' });
  const navigate = useNavigate();
  const currModel: string = model ?? params.model ?? '';
  const currId: string = id ?? params.id ?? '';
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
  const detailFieldNames = Object.keys(fields).filter((fieldName) => {
    const fieldObj = parseMQLType(fieldName, fields[fieldName].update);
    return !fieldObj.many;
  });
  const detailFields = detailFieldNames.map((fieldName) => ({
    ...parseMQLType(fieldName, fields[fieldName].update),
    type: fields[fieldName].baseType,
  }));

  const tableFieldNames = Object.keys(fields).filter((fieldName) => {
    const fieldObj = parseMQLType(fieldName, fields[fieldName].update);
    return fieldObj.many;
  });

  // Item query
  const { data, error, isLoading, isError, isSuccess, operationName } =
    useModelItemQuery({
      id: currId,
      model: currModel,
      fieldNames: detailFieldNames,
    });
  const detailData = data?.[operationName];

  // Select Mutation
  const { mutateAsync: selectOptionMutateAsync } = useModelListMutation();
  const onOpenFieldSelect = (model: string) => {
    return selectOptionMutateAsync(model).then((data: any) => {
      return data.items.map((item: any) => ({
        label: item.id,
        value: JSON.stringify(item.id),
      }));
    });
  };

  // Check Delete
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { mutateAsync: checkDeleteMutateAsync } = useModelCheckDeleteMutation({
    model: currModel,
  });
  const [checkDeleteResults, setCheckDeleteResults] = useState({});

  // Handle Delete
  const { mutateAsync: deleteMutateAsync } = useModelDeleteMutation({
    model: currModel,
    fieldNames: ['id'],
  });

  // Update Mutation
  const { mutateAsync: updateMutateAsync } = useModelUpdateMutation({
    model: currModel,
    fieldNames: detailFields
      .filter((field) => field.editable || field.name === 'id')
      .map((field) => field.name),
  });
  const onUpdate = async ({ data, dirtyFields }: OnSaveProps) => {
    Object.keys(data).forEach((fieldName) => {
      if (typeof data[fieldName] === 'object') {
        data[fieldName] = data[fieldName]?.id;
      }
    });

    return updateMutateAsync(data)
      .then(() => {
        addAlert({
          content: `${currModel} updated!`,
          className: 'success',
          expires: 2000,
        });
      })
      .catch((err) =>
        addAlert({
          content: `${currModel} failed to update: ${err}`,
          className: 'danger',
        }),
      );
  };

  useEffect(() => {
    const modelDisplayName = humanizeText(currModel);
    if (!isLoading) {
      if (isSuccess) {
      } else if (isError) {
        addAlert({
          content: `Failed to fetch ${modelDisplayName}: ${error}`,
          className: 'danger',
        });
      }
    }
  }, [data, isLoading, isSuccess, isError]);

  return detailData ? (
    <Fragment key={`${currModel}/${currId}`}>
      <ModelForm
        fields={detailFields}
        defaultValues={detailData}
        onSubmit={onUpdate}
        onDelete={async () => {
          return checkDeleteMutateAsync(currId)
            .then((res: any) => {
              setOpenDeleteModal(true);
              setCheckDeleteResults(res.check_delete);
            })
            .catch((err) => {
              addAlert({
                content: `Failed to check delete: ${err}`,
                className: 'danger',
              });
            });
        }}
        onOpenFieldSelect={onOpenFieldSelect}
        initialLens={DataLens.DISPLAY}
      >
        <ModelForm.Title>
          <span>
            <Link
              to={`/${currModel}`}
              className="underline underline-offset-1 text-cyan-600"
            >
              {humanizeText(currModel)}
            </Link>
            :{currId}
          </span>
          <span>
            <ModelForm.DetailCrud />
          </span>
        </ModelForm.Title>
        <ModelForm.Content />
      </ModelForm>
      {tableFieldNames.map((fieldName) => {
        return (
          <DetailModelIndex
            key={fieldName}
            relationshipModel={currModel}
            relationshipId={currId}
            fieldModel={fields[fieldName].baseType}
          />
        );
      })}
      <ModelFormDeleteModal
        id={currId}
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        deleteResults={checkDeleteResults}
        onConfirmDelete={(id: ID) => {
          deleteMutateAsync(id)
            .then(() => {
              addAlert({
                content: `Successfully deleted ${currModel}!`,
                className: 'success',
              });
              navigate({ to: '../' });
            })
            .catch((err) => {
              addAlert({
                content: `Failed to delete: ${err}`,
                className: 'danger',
              });
            });
        }}
      />
    </Fragment>
  ) : (
    '...loading'
  );
};
