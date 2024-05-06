import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { ModelIndex } from '@/ModelIndex';
import { useStore, useTableView } from '@/hooks';
import { humanizeText } from '@/utils';

import { useConveyor } from '../Conveyor/useConveyor';
import { useModelListQuery } from '../Conveyor/useModelListQuery';

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
  const updatableFields = Object.keys(fields).filter(
    (field) => fields[field].update,
  );

  const { tableViewStore, ...tableViewFns } = useTableView({
    initialTableView: storedTableView,
  });
  const tableView = useStore(tableViewStore, (state) => state);

  const { data, error, isLoading, isError, isSuccess, operationName } =
    useModelListQuery({ model: currModel, fields: updatableFields, tableView });
  const tableData = data?.[operationName]?.items;

  useEffect(() => {
    const modelDisplayName = humanizeText(currModel);
    if (isLoading === false) {
      if (isSuccess) {
        // addAlert({
        //   content: `Successfully fetched ${modelDisplayName} list!`,
        //   expires: 3000,
        //   className: 'success',
        // });
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
              // tableView that is stored in the persistence object will
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
      title={currModel}
      fields={updatableFields}
      data={tableData}
      tableView={tableView}
      onCreate={() => navigate({ to: `/${currModel}/create` })}
      {...tableViewFns}
    >
      {children}
    </ModelIndex>
  );
};
