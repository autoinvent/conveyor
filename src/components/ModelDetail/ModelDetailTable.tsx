import { useContext } from 'react';
import { Table } from 'react-bootstrap';

import { ConveyorContext } from '../../contexts/ConveyorContext';
import { PACKAGE_ABBR } from '../../package';
import { BaseProps, FieldData } from '../../types';
import ModelFormField from '../ModelForm/ModelFormField';
import ModelTableHeader from '../ModelTable/ModelTableHeader';
import ModelTableRow from '../ModelTable/ModelTableRow';

import ModelDetailTableCrud from './ModelDetailTableCrud';

interface ModelDetailTableProps extends BaseProps {
  parentId: string;
  parentModelName: string;
  parentField: string;
  parentFieldsData: Record<string, FieldData>;
  parentData: Record<string, any>;
  editable?: boolean;
  deletable?: boolean;
}

const ModelDetailTable = ({
  id,
  className,
  parentId,
  parentModelName,
  parentField,
  parentFieldsData,
  parentData,
  editable = true,
  deletable = true,
}: ModelDetailTableProps) => {
  const related = parentFieldsData[parentField].related;
  if (!related) return null;

  const { primaryKey } = useContext(ConveyorContext);
  const showCrud = editable || deletable;
  const { modelName, fields = [], fieldsData } = related;
  const dataList = parentData[parentField];
  return (
    <Table id={id} className={className} striped bordered hover size='sm'>
      <thead id={id} className={className}>
        <tr>
          {fields.map((field) => {
            const displayLabelFn = fieldsData?.[field]?.displayLabelFn;
            return (
              <ModelTableHeader
                key={`${PACKAGE_ABBR}-table-header-${field}}`}
                modelName={`${parentModelName}/${modelName}`}
                field={field}
                displayLabelFn={displayLabelFn}
                sortable={false}
              />
            );
          })}
          {showCrud && <th className={`${PACKAGE_ABBR}-crud-header`} />}
        </tr>
      </thead>
      <tbody>
        {dataList.map((rowData: Record<string, any>) => {
          return (
            <ModelTableRow
              key={`${PACKAGE_ABBR}-table-row-${rowData[primaryKey]}`}
              modelName={modelName}
              fields={fields}
              data={rowData}
              fieldsData={fieldsData}
              editable={editable}
              deletable={deletable}
            >
              {fields.map((field) => {
                return (
                  <td key={`${PACKAGE_ABBR}-table-cell-${field}`}>
                    <ModelFormField
                      modelName={modelName}
                      fields={fields}
                      field={field}
                      data={rowData}
                      fieldData={fieldsData?.[field]}
                    />
                  </td>
                );
              })}
              {showCrud ? (
                <td className={`${PACKAGE_ABBR}-model-table-crud-cell`}>
                  <ModelDetailTableCrud
                    parentId={parentId}
                    parentModelName={parentModelName}
                    parentField={parentField}
                    parentFieldsData={parentFieldsData}
                    parentData={parentData}
                    data={rowData}
                    editable={editable}
                    deletable={deletable}
                  />
                </td>
              ) : null}
            </ModelTableRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ModelDetailTable;
