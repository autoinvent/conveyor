import { useMemo, useContext, useState, useEffect } from 'react';

import { ConveyorContext } from '../../contexts/ConveyorContext';
import { useGQLQuery, GQLQueryAction } from '../../hooks/useGQLQuery';
import { useTableView } from '../../hooks/useTableView';
import { BaseProps, FieldData } from '../../types';
import { getGQLAction, getGQLDocument } from '../../utils/gqlRequest';
import ModelTable from '../ModelTable/ModelTable';
import ModelTablePagination from '../ModelTable/ModelTablePagination';
import Loading from '../commons/Loading';
import ModelIndexTableFilter from './ModelIndexTableFilter';

interface ModelIndexTableProps extends BaseProps {
  modelName: string;
  fields: string[];
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
}

const ModelIndexTable = ({
  id,
  className,
  modelName,
  fields,
  fieldsData,
  editable,
  deletable,
}: ModelIndexTableProps) => {
  const { dispatch, tableView } = useTableView({ modelName });
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
  const [filters, setFilters] = useState<
    { field: string; operator: string; value: string; modelName: string }[]
  >([]); // State to manage filters

  useEffect(() => {
    // Save filters and sorts to local storage when they change
    localStorage.setItem(`${modelName}_filters`, JSON.stringify(filters));
  }, [filters, modelName]);

  const { data, error } = useGQLQuery({
    action,
    document,
    variables: {
      ...tableView,
      filters: filters.filter((filter) => filter.modelName === modelName),
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
      {/* TODO: Filter under construction */}
      <ModelIndexTableFilter
        modelName={modelName}
        fields={fields}
        filters={filters}
        setFilters={setFilters}
        dispatch={dispatch}
      />
      <ModelTable
        id={id}
        className={className}
        modelName={modelName}
        fields={fields}
        fieldsData={fieldsData}
        dataList={modelListData}
        editable={editable}
        deletable={deletable}
      />
      <ModelTablePagination
        modelName={modelName}
        modelListTotal={modelListTotal}
      />
    </>
  );
};

export default ModelIndexTable;
