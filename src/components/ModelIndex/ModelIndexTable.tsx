import { useMemo, useContext } from 'react';

import { ConveyorContext } from '../../contexts/ConveyorContext';
import { useGQLQuery, GQLQueryAction } from '../../hooks/useGQLQuery';
import { useTableView } from '../../hooks/useTableView';
import { BaseProps, FieldData } from '../../types';
import { getGQLAction, getGQLDocument } from '../../utils/gqlRequest';
import ModelTable from '../ModelTable/ModelTable';
import ModelTablePagination from '../ModelTable/ModelTablePagination';
import Loading from '../commons/Loading';

interface ModelIndexTableProps extends BaseProps {
  modelName: string;
  fields: string[];
  fieldsData: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
  filters?: any;
  setSorts?: any;
  sorts: any[];
}

const ModelIndexTable = ({
  id,
  className,
  modelName,
  fields,
  fieldsData,
  editable,
  deletable,
  filters,
  setSorts,
  sorts,
}: ModelIndexTableProps) => {
  const { tableView } = useTableView({ modelName });
  const { primaryKey } = useContext(ConveyorContext);
  const actionType = GQLQueryAction.MODEL_LIST;
  const action = getGQLAction(actionType, modelName);
  const document = getGQLDocument(
    actionType,
    modelName,
    primaryKey,
    fields,
    fieldsData,
  );

  const filterFiltersByModel = (filters: any, modelName: string) => {
    // Filter out the model key from each filter item and only include filters for the specific model value
    return filters
      .map((group: any) =>
        group
          .map((filter: any) => {
            const { model, ...rest } = filter;
            if (model === modelName) {
              return rest;
            }
          })
          .filter((filter: any) => filter !== undefined) // Filter out undefined filters
      )
      .filter((group: any) => group.length > 0); // Filter out groups with no filters
  };

  const { data, error } = useGQLQuery({
    action,
    document,
    variables: {
      ...tableView,
      filter: filterFiltersByModel(filters, modelName),
    },
  });

  const { modelListData, modelListTotal } = useMemo(
    () => ({
      modelListData: data?.[action]?.items,
      modelListTotal: data?.[action]?.total,
    }),
    [JSON.stringify(data?.[action]?.items)],
  );
  const loading = Object.values({ ...data, ...error }).length === 0;

  return loading ? (
    <Loading />
  ) : (
    <>
      <ModelTable
        id={id}
        className={className}
        modelName={modelName}
        fields={fields}
        fieldsData={fieldsData}
        dataList={modelListData}
        editable={editable}
        deletable={deletable}
        setSorts={setSorts}
        sorts={sorts}
      />
      <ModelTablePagination
        modelName={modelName}
        modelListTotal={modelListTotal}
      />
    </>
  );
};

export default ModelIndexTable;
