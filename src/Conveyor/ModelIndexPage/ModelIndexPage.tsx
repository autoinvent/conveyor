import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { ModelIndex } from '@/ModelIndex';
import { OnSaveProps } from '@/types';
import { humanizeText } from '@/utils';

import { useConveyor } from '../Conveyor/useConveyor';
import { useModelListQuery } from '../hooks/useModelListQuery';
import { parseMQLType } from '../utils';
import { useModelUpdateMutation } from '../hooks/useModelUpdateMutation';
import { useModelListMutation } from '../hooks';

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
      fields={updatableFieldNames.map((fieldName) => ({
        ...parseMQLType(fieldName, fields[fieldName].update),
        type: fields[fieldName].baseType,
      }))}
      data={tableData}
      tableView={tableView}
      setTableView={setTableView}
      title={humanizeText(currModel)}
      onCreate={() => navigate({ to: `/${currModel}/create` })}
      onSave={async ({ data, dirtyFields }: OnSaveProps) => {
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
      }}
      onOpenFieldSelect={onOpenFieldSelect}
    >
      {children}
    </ModelIndex>
  );
};
