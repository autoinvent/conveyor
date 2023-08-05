import { useMemo } from "react";

import useGQLQuery, { GQLQueryAction } from "../../hooks/useGQLQuery";
import useTableView from "../../hooks/useTableView";
import { BaseProps, FieldData } from "../../types";
import { generateGQLAction, generateGQLDocument } from "../../utils/gqlRequest";
import Loading from "../commons/Loading"
import ModelTable from "../ModelTable/ModelTable";
import ModelTablePagination from "../ModelTable/ModelTablePagination";

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
  const action = generateGQLAction(GQLQueryAction.MODEL_LIST, modelName);
  const document = generateGQLDocument(GQLQueryAction.MODEL_LIST, modelName, fields, fieldsData);
  const { data, error } = useGQLQuery({ action, document, variables: tableView, });
  const { modelListData, modelListTotal } = useMemo(
    () => ({
      modelListData: data?.[action]?.items,
      modelListTotal: data?.[action]?.total,
    }),
    [JSON.stringify(data?.[action]?.items)]
  );
  const loading = Object.values(Object.assign(data, error)).length === 0;
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
      />
      <ModelTablePagination
        modelName={modelName}
        modelListTotal={modelListTotal}
      />
    </>
  );
};

export default ModelIndexTable;
