import { memo, FC, ReactNode } from "react";
import { Table } from "react-bootstrap";

import { BaseProps, FieldData } from "../../types";

import ModelTableHead from "./ModelTableHead";
import ModelTableBody from "./ModelTableBody";

interface ModelTableProps extends BaseProps {
  modelName: string;
  fields: string[];
  dataList?: Record<string, any>[];
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
  children?: ReactNode;
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
  children,
}: ModelTableProps) => {
  const showCrud = editable || deletable;

  return (
    <Table id={id} className={className}>
      {children ?? (
        <>
          <ModelTableHead
            modelName={modelName}
            fields={fields}
            fieldsData={fieldsData}
            showCrud={showCrud}
          />
          <ModelTableBody
            modelName={modelName}
            fields={fields}
            dataList={dataList}
            fieldsData={fieldsData}
            editable={editable}
            deletable={deletable}
          />
        </>
      )}
    </Table>
  );
};

export default memo(ModelTable) as FC<ModelTableProps>;
