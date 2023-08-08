import { useContext } from "react";
import { Table } from "react-bootstrap";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { PACKAGE_ABBR } from "../../package";
import { BaseProps, FieldData } from "../../types";
import ModelFormField from "../ModelForm/ModelFormField";
import ModelTableHead from "../ModelTable/ModelTableHead";
import ModelTableRow from "../ModelTable/ModelTableRow";

import ModelDetailTableCrud from "./ModelDetailTableCrud";

interface ModelDetailTableProps extends BaseProps {
  parentId: string;
  parentModelName: string;
  parentField: string;
  parentFields: string[];
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
  parentFields,
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
    <Table id={id} className={className}>
      <ModelTableHead
        modelName={`${parentModelName}/${modelName}`}
        fields={fields}
        fieldsData={fieldsData}
        showCrud={showCrud}
        sortable={false}
      />
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
                <td className={`${PACKAGE_ABBR}-model-table-crud `}>
                  <ModelDetailTableCrud
                    parentId={parentId}
                    parentModelName={parentModelName}
                    parentField={parentField}
                    parentFields={parentFields}
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
