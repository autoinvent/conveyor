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
    // If there are no filters, return true for all items
    if (filters.length === 0) {
      return true;
    }

    // Check each filter condition
    return filters.some((filterGroup: any) => {
      // Extract the andFilterGroup from filterGroup
      const andFilterGroup = filterGroup.filters;
      // Implement your filtering logic based on the filter conditions in andFilterGroup
      return andFilterGroup.every((filter: any) => {
        let returnVal = true;
        const { field, operator, value, not } = filter;
        if (value?.length > 0) {
          const itemVal = item[field];

          switch (operator) {
            case '==':
              returnVal = itemVal === Number(value);
              break;
            case '!=':
              returnVal = itemVal !== Number(value);
              break;
            case '>':
              returnVal = itemVal > Number(value);
              break;
            case '<':
              returnVal = itemVal < Number(value);
              break;
            case '>=':
              returnVal = itemVal === Number(value) || itemVal > Number(value);
              break;
            case '=<':
              returnVal = itemVal === Number(value) || itemVal < Number(value);
              break;
            case 'Equals':
              returnVal = itemVal === value;
              break;
            case 'NEQ':
              returnVal = itemVal !== value;
              break;
            case 'Contains':
              returnVal = itemVal.includes(value);
              break;
            case 'Exists': {
              const isWhitespaceString = (str: string) => !/\S/.test(str);
              if (
                !isWhitespaceString(itemVal) &&
                (value.toLowerCase() === 'true' ||
                  value === '1' ||
                  value.toLowerCase() === 'on')
              ) {
                returnVal = true;
              } else if (
                isWhitespaceString(itemVal) &&
                (value.toLowerCase() === 'false' ||
                  value === '0' ||
                  value.toLowerCase() === 'off')
              ) {
                returnVal = true;
              } else {
                return false;
              }
              break;
            }
            case 'DNE': {
              const isWhitespaceString = (str: string) => !/\S/.test(str);
              if (
                isWhitespaceString(itemVal) &&
                (value.toLowerCase() === 'true' ||
                  value === '1' ||
                  value.toLowerCase() === 'on')
              ) {
                returnVal = true;
              } else if (
                !isWhitespaceString(itemVal) &&
                (value.toLowerCase() === 'false' ||
                  value === '0' ||
                  value.toLowerCase() === 'off')
              ) {
                returnVal = true;
              } else {
                return false;
              }
              break;
            }
            case 'Before': {
              const date = new Date(value);
              const itemDate = new Date(itemVal);
              if (date.toString() !== 'Invalid Date') {
                returnVal = itemDate.toISOString() < date.toISOString();
              } else {
                returnVal = true;
              }
              console.log(date.toString());
              break;
            }
            case 'After': {
              const date = new Date(value);
              const itemDate = new Date(itemVal);
              if (date.toString() !== 'Invalid Date') {
                returnVal = itemDate.toISOString() > date.toISOString();
              } else {
                returnVal = true;
              }
              break;
            }
            case 'On': {
              const date = new Date(value);
              const itemDate = new Date(itemVal);
              if (date.toString() !== 'Invalid Date') {
                if (itemDate.toDateString() === date.toDateString()) {
                  returnVal = true;
                } else {
                  returnVal = false;
                }
              } else {
                returnVal = true;
              }
              break;
            }
            case 'NotOn': {
              const date = new Date(value);
              const itemDate = new Date(itemVal);
              if (date.toString() !== 'Invalid Date') {
                if (itemDate.toDateString() === date.toDateString()) {
                  returnVal = false;
                } else {
                  returnVal = true;
                }
              } else {
                returnVal = true;
              }
              break;
            }
            case 'Is':
              if (
                itemVal &&
                (value.toLowerCase() === 'true' ||
                  value === '1' ||
                  value.toLowerCase() === 'on')
              ) {
                returnVal = true;
              } else if (
                !itemVal &&
                (value.toLowerCase() === 'false' ||
                  value === '0' ||
                  value.toLowerCase() === 'off')
              ) {
                returnVal = true;
              } else {
                returnVal = false;
              }
              break;
            case 'IsNot':
              if (
                itemVal &&
                (value.toLowerCase() === 'true' ||
                  value === '1' ||
                  value.toLowerCase() === 'on')
              ) {
                returnVal = false;
              } else if (
                !itemVal &&
                (value.toLowerCase() === 'false' ||
                  value === '0' ||
                  value.toLowerCase() === 'off')
              ) {
                returnVal = false;
              } else {
                returnVal = true;
              }
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
        // Support Exists/DNE case even if input length is 0
        } else if(operator === 'Exists' || operator === 'DNE') {
          const isWhitespaceString = (str: string) => !/\S/.test(str);
          if(operator === 'Exists') {     
            if(!isWhitespaceString(item[field])) {
              returnVal = true;
            } else {
              returnVal = false;
            }
          } else if(operator === 'DNE') {
            if(isWhitespaceString(item[field])) {
              returnVal = true;
            } else {
              returnVal = false;
            }
          }
          if (not === true) {
            // Flip the return value for 'not' condition
            return !returnVal;
          } else {
            return returnVal;
          }
        } else {
          return true;
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
