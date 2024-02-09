import { memo, FC, useContext, useMemo, useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';

import { ConveyorContext } from '../../contexts/ConveyorContext';
import { PACKAGE_ABBR } from '../../package';
import { BaseProps, FieldData } from '../../types';

import ModelTableHeader from './ModelTableHeader';
import ModelTableRow from './ModelTableRow';
import { SortDirection, TableViewsAction } from '../../reducers';
import { useTableView } from '../../hooks';

interface ModelTableProps extends BaseProps {
  modelName: string;
  fields: string[];
  dataList?: Record<string, any>[];
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
  setSorts?: any;
  sorts: any[];
}

const ModelTable = ({
  id,
  className,
  modelName,
  fields,
  dataList = [],
  fieldsData,
  editable = true,
  deletable = true,
  setSorts,
  sorts,
}: ModelTableProps) => {
  const showCrud = editable || deletable;
  const memoDataList = useMemo(() => dataList, [JSON.stringify(dataList)]);
  const { primaryKey } = useContext(ConveyorContext);
  const { dispatch } = useTableView({ modelName });
  const resetSort = () => {
    dispatch({
      type: TableViewsAction.CLEAR_SORTS,
      payload: { modelName },
    });
    setSorts([]);
  };
  return (
    <Table id={id} className={className} striped bordered hover size='sm'>
      <thead id={id} className={className}>
        <tr>
          {fields.map((field) => {
            const displayLabelFn = fieldsData?.[field]?.displayLabelFn;
            return (
              <ModelTableHeader
                key={`${PACKAGE_ABBR}-table-header-${field}}`}
                modelName={modelName}
                field={field}
                displayLabelFn={displayLabelFn}
                sortable={true}
                sorts={sorts}
                setSorts={setSorts}
              />
            );
          })}
          {showCrud && (
            <th className={`${PACKAGE_ABBR}-crud-header`}>
              <Button
                variant='secondary-outline'
                onClick={resetSort}
                className='sort-reset'
                style={{ fontSize: 'x-small' }}
              >
                {<FaSync />}
              </Button>
            </th>
          )}
        </tr>
      </thead>
      <tbody id={id} className={className}>
        {memoDataList.map((rowData) => {
          return (
            <ModelTableRow
              key={`${PACKAGE_ABBR}-table-row-${rowData[primaryKey]}`}
              modelName={modelName}
              fields={fields}
              data={rowData}
              fieldsData={fieldsData}
              editable={editable}
              deletable={deletable}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default memo(ModelTable) as FC<ModelTableProps>;
