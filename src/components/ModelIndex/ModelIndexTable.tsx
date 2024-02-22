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
  const { data, error } = useGQLQuery({
    action,
    document,
    variables: tableView,
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
      <div style={{ overflowX: 'auto' }}>
        {/* Add a wrapping div for horizontal scrolling */}
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
      </div>
      <ModelTablePagination
        modelName={modelName}
        modelListTotal={modelListTotal}
      />
    </>
  );
};

export default ModelIndexTable;
