import { memo, FC, useContext, useMemo, useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

import { ConveyorContext } from '../../contexts/ConveyorContext';
import { PACKAGE_ABBR } from '../../package';
import { BaseProps, FieldData } from '../../types';

import ModelTableHeader from './ModelTableHeader';
import ModelTableRow from './ModelTableRow';
import { FaSync } from 'react-icons/fa';

interface ModelTableProps extends BaseProps {
  modelName: string;
  fields: string[];
  dataList?: Record<string, any>[];
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
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
}: ModelTableProps) => {
  const [columnOrder, setColumnOrder] = useState(fields);
  const showCrud = editable || deletable;
  const memoDataList = useMemo(() => dataList, [JSON.stringify(dataList)]);
  const { primaryKey } = useContext(ConveyorContext);
  const resetColumnOrder = () => {
    setColumnOrder(fields);
  };
  useEffect(() => {
    const storedColumnOrder = localStorage.getItem(`${modelName}_column_order`);
    if (storedColumnOrder) {
      setColumnOrder(JSON.parse(storedColumnOrder));
    } else {
      setColumnOrder(fields);
    }
  }, [modelName]);

  useEffect(() => {
    localStorage.setItem(
      `${modelName}_column_order`,
      JSON.stringify(columnOrder),
    );
  }, [columnOrder]);

  const handleColumnReorder = (dragIndex: number, hoverIndex: number) => {
    const newColumnOrder = [...columnOrder];
    const draggedColumn = newColumnOrder[dragIndex];
    newColumnOrder.splice(dragIndex, 1);
    newColumnOrder.splice(hoverIndex, 0, draggedColumn);
    setColumnOrder(newColumnOrder);
  };

  return (
    <Table id={id} className={className} striped bordered hover size='sm'>
      <thead id={id} className={className}>
        <tr>
          {columnOrder.map((field, index) => {
            const displayLabelFn = fieldsData?.[field]?.displayLabelFn;
            return (
              <ModelTableHeader
                key={`${PACKAGE_ABBR}-table-header-${field}}`}
                modelName={modelName}
                field={field}
                displayLabelFn={displayLabelFn}
                index={index}
                handleColumnReorder={handleColumnReorder}
              />
            );
          })}
          {showCrud && (
            <th className={`${PACKAGE_ABBR}-crud-header`}>
              <Button
                variant='secondary-outline'
                onClick={resetColumnOrder}
                className='column-reset'
                style={{ fontSize: 'x-small'}}
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
              fields={columnOrder} // Pass the reordered column order
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
