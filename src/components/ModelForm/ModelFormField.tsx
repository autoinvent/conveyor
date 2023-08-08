import { useContext } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import {
  DisplayModeContext,
  DisplayMode,
} from "../../contexts/commons/DisplayModeContext";
import { BaseProps, FieldData } from "../../types";

import ModelFormInput from "./ModelFormInput";
import ModelFormValue from "./ModelFormValue";

interface ModelFormFieldProps extends BaseProps {
  modelName: string;
  fields: string[];
  field: string;
  data: Record<string, any>;
  fieldData?: FieldData;
}

const ModelFormField = ({
  id,
  className,
  modelName,
  fields,
  field,
  data,
  fieldData,
}: ModelFormFieldProps) => {
  const { mode } = useContext(DisplayModeContext);
  const { primaryKey } = useContext(ConveyorContext);

  return (
    <div id={id} className={className}>
      {fieldData?.displayValueFn?.(data?.[field]) ??
      (mode === DisplayMode.DISPLAY || field === primaryKey) ? (
        <ModelFormValue
          modelName={modelName}
          fields={fields}
          field={field}
          data={data}
          fieldData={fieldData}
        />
      ) : (
        <ModelFormInput field={field} fieldData={fieldData} />
      )}
    </div>
  );
};

export default ModelFormField;
