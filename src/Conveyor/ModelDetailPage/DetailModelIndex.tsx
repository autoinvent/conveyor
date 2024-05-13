import { useEffect, useState } from 'react';
import { Accordion } from '@radix-ui/react-accordion';
import { useNavigate } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { ModelIndex } from '@/ModelIndex';
import { OnSaveProps, TableView } from '@/types';
import { camelToSnakeCase, humanizeText, isModelType } from '@/utils';

import { useConveyor } from '../Conveyor/useConveyor';
import { useModelListQuery } from '../hooks/useModelListQuery';
import { parseMQLType } from '../utils';
import { useModelUpdateMutation } from '../hooks/useModelUpdateMutation';
import { useModelListMutation } from '../hooks';
import { IdCell, RelationshipCell } from '../ModelIndexPage';

export interface DetailModelIndexProps {
  relationshipModel: string
  relationshipId: string
  fieldModel: string
}

export const DetailModelIndex = ({ relationshipModel, relationshipId, fieldModel }: DetailModelIndexProps) => {
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const {
    selected: { models },
    setConveyor,
  } = useConveyor((state) => {
    const { models } = state;
    return {
      models,
    };
  });

  const fields = models[fieldModel]?.fields ?? {};
  const initialTableView: TableView = {
    filter: [[
      {
        path: `${camelToSnakeCase(relationshipModel)}.id`,
        op: 'eq',
        value: relationshipId
      }]]
  }
  const updatableFieldNames = Object.keys(fields).filter((fieldName) => {
    const fieldObj = parseMQLType(fieldName, fields[fieldName].update);
    return fieldObj.type && !fieldObj.many && fields[fieldName].baseType !== relationshipModel;
  });
  const modelIndexFields = updatableFieldNames.map((fieldName) => ({
    ...parseMQLType(fieldName, fields[fieldName].update),
    type: fields[fieldName].baseType,
  }))

  // List Query
  const [tableView, setTableView] = useState(initialTableView);
  const { data, error, isLoading, isError, isSuccess, operationName } =
    useModelListQuery({
      model: fieldModel,
      fieldNames: updatableFieldNames,
      tableView,
    });
  const tableData = data?.[operationName]?.items;

  // Update Mutation
  const { mutateAsync: updateMutateAsync } = useModelUpdateMutation({
    model: fieldModel,
    fieldNames: updatableFieldNames,
  });
  const onSave = async ({ data, dirtyFields }: OnSaveProps) => {
    Object.keys(data).forEach((fieldName) => {
      if (typeof data[fieldName] === 'object') {
        data[fieldName] = data[fieldName]?.id;
      }
    });
    return updateMutateAsync(data)
      .then(() =>
        addAlert({
          content: `${fieldModel} updated!`,
          className: 'success',
          expires: 2000,
        }),
      )
      .catch((err) =>
        addAlert({
          content: `${fieldModel} failed to update: ${err}`,
          className: 'danger',
        }),
      );
  };

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

  useEffect(() => {
    const modelDisplayName = humanizeText(fieldModel);
    if (!isLoading) {
      if (isSuccess) {
      } else if (isError) {
        addAlert({
          content: `Failed to fetch ${modelDisplayName} list: ${error}`,
          className: 'danger',
        });
      }
    }
  }, [data, isLoading, isSuccess, isError]);
  return (
    <ModelIndex
      fields={modelIndexFields}
      data={tableData}
      tableView={tableView}
      setTableView={setTableView}
      title={humanizeText(fieldModel)}
      onCreate={() => navigate({ to: `/${fieldModel}/create` })}
      onSave={onSave}
      onOpenFieldSelect={onOpenFieldSelect}
      className="my-6"
    >
      <ModelIndex.Title className="text-2xl" />
      <ModelIndex.Table>
        <ModelIndex.Table.Head />
        <ModelIndex.Table.Body>
          <ModelIndex.Table.Row>
            {
              modelIndexFields.map((field) => {
                if (field.name === 'id') {
                  return (
                    <IdCell key={field.name} model={fieldModel} />
                  )
                } else if (isModelType(field)) {
                  return <RelationshipCell key={field.name} field={field} />
                }
                return (
                  <ModelIndex.Table.Cell key={field.name} fieldName={field.name} />
                )
              })
            }
            <ModelIndex.Table.ActionCell />
          </ModelIndex.Table.Row>
        </ModelIndex.Table.Body>
        <ModelIndex.Table.Fallback />
      </ModelIndex.Table>
      <ModelIndex.Pagination />
    </ModelIndex>
  )
}