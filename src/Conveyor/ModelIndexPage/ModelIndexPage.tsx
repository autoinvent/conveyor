import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { ModelIndex } from '@/ModelIndex';
import { OnSaveProps } from '@/types';
import { humanizeText, isModelType } from '@/utils';

import { useConveyor } from '../Conveyor/useConveyor';
import { useModelListQuery } from '../hooks/useModelListQuery';
import { parseMQLType } from '../utils';
import { useModelUpdateMutation } from '../hooks/useModelUpdateMutation';
import { useModelListMutation } from '../hooks';
import { IdCell } from "./IdCell"
import { RelationshipCell } from "./RelationshipCell"

export interface ModelIndexPage {
  model?: string;
  children?: ReactNode;
}

export const ModelIndexPage = ({ model, children }: ModelIndexPage) => {
  const params = useParams({ from: '/$model' });
  const currModel: string = model ?? params.model ?? '';
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const tableViewId = `table-view-${model}-index-page`;
  const {
    selected: { models, persistence, storedTableView },
    setConveyor,
  } = useConveyor((state) => {
    const { models, persistence, tableViews } = state;
    return {
      models,
      persistence,
      storedTableView: tableViews[tableViewId] ?? {},
    };
  });

  const fields = models[currModel]?.fields ?? {};
  const updatableFieldNames = Object.keys(fields).filter((fieldName) => {
    const fieldObj = parseMQLType(fieldName, fields[fieldName].update);
    return fieldObj.type && !fieldObj.many;
  });
  const modelIndexFields = updatableFieldNames.map((fieldName) => ({
    ...parseMQLType(fieldName, fields[fieldName].update),
    type: fields[fieldName].baseType,
  }))

  // List Query
  const [tableView, setTableView] = useState(storedTableView);
  const { data, error, isLoading, isError, isSuccess, operationName } =
    useModelListQuery({
      model: currModel,
      fieldNames: updatableFieldNames,
      tableView,
    });
  const tableData = data?.[operationName]?.items;

  // Update Mutation
  const { mutateAsync: updateMutateAsync } = useModelUpdateMutation({
    model: currModel,
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
          content: `${currModel} updated!`,
          className: 'success',
          expires: 2000,
        }),
      )
      .catch((err) =>
        addAlert({
          content: `${currModel} failed to update: ${err}`,
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
    const modelDisplayName = humanizeText(currModel);
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

  useEffect(() => {
    persistence
      .get(tableViewId)
      .then((tv: string) => {
        setConveyor((state) => {
          return {
            ...state,
            tableViews: {
              ...state.tableViews,
              // tableView that is stored in the persistence object will be
              // prioritized and merged into the defined tableView from Conveyor
              [tableViewId]: Object.assign(tableView, tv ? JSON.parse(tv) : {}),
            },
          };
        });
      })
      .catch((err: Error) => {
        console.log(err); // TODO: handle properly
      });
    return () => {
      // On page unmount, save the tableView into the persistence object
      persistence.set(tableViewId, JSON.stringify(tableView));
    };
  }, []);

  return (
    <ModelIndex
      fields={modelIndexFields}
      data={tableData}
      tableView={tableView}
      setTableView={setTableView}
      title={humanizeText(currModel)}
      onCreate={() => navigate({ to: `/${currModel}/create` })}
      onSave={onSave}
      onOpenFieldSelect={onOpenFieldSelect}
    >
      {children === undefined ? (
        <>
          <ModelIndex.Title />
          <ModelIndex.Table>
            <ModelIndex.Table.Head />
            <ModelIndex.Table.Body>
              <ModelIndex.Table.Row>
                {
                  modelIndexFields.map((field) => {
                    if (field.name === 'id') {
                      return (
                        <IdCell key={field.name} model={currModel} />
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
        </>
      ) : children}
    </ModelIndex>
  );
};
