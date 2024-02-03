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
  filters?: any;
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
    variables: {
      ...tableView,
      filters: filters.filter(
        (filter: { modelName: string }) => filter.modelName === modelName,
      ),
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

  // Apply filters to the modelListData
  const filteredModelListData = modelListData?.filter((item: any) => {
    // Check each filter condition
    return filters.every((filterGroup: any) => {
      const { filter1, filter2, filter3, filter4 } = filterGroup;

      // Implement your filtering logic based on the filter conditions
      return [filter1, filter2, filter3, filter4].some((filter: any) => {
        let returnVal = true;
        const { field, operator, value, not } = filter;
        let itemVal = item[field];

        if (itemVal === true) {
          itemVal = 'true';
        } else if (itemVal === false) {
          itemVal = 'false';
        }

        switch (operator) {
          case '==':
            returnVal = itemVal.toString() === value;
            break;
          case '!=':
            returnVal = itemVal.toString() !== value;
            break;
          case '>':
            returnVal = itemVal.toString() > value;
            break;
          case '<':
            returnVal = itemVal.toString() < value;
            break;
          case ' contains ':
            returnVal = itemVal.toString().includes(value);
            break;
          // Add more cases for other operators as needed
          default:
            returnVal = true;
        }

        if (not === true) {
          // Flip the return value for 'not' condition
          return !returnVal;
        } else {
          return returnVal;
        }
      });
    });
  });

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
        dataList={filteredModelListData}
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
