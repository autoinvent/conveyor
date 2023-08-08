import { useContext } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import {
  DisplayModeContext,
  DisplayMode,
} from "../../contexts/commons/DisplayModeContext";
import ModelFormInput from "./ModelFormInput";
import { BaseProps, FieldData } from "../../types";
import { getAvailableKeys } from "../../utils/gqlRequest";
import Link from "../commons/Link";

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
  const { navigate, primaryKey, secondaryKeys } = useContext(ConveyorContext);

  const currData = data?.[field];
  const related = fieldData?.related;
  let displayData = currData;
  const keyFallbacks = [primaryKey].concat(secondaryKeys ?? []);
  if (related) {
    const availableKeys = getAvailableKeys(related.fields ?? [], keyFallbacks);
    if (!related.many) {
      displayData = [displayData];
    }
    displayData = displayData?.map(
      (val: Record<string, any>, index: number) => (
        <Link
          key={index}
          modelName={related?.modelName}
          modelId={val[primaryKey]}
        >
          {val?.[availableKeys.at(1) ?? primaryKey]}
          {index !== displayData?.length - 1 && ","}
        </Link>
      )
    );
  } else if (getAvailableKeys(fields, keyFallbacks).includes(field)) {
    displayData = (
      <Link modelName={modelName} modelId={data[primaryKey]}>
        {currData}
      </Link>
    );
  }

  return (
    <div id={id} className={className}>
      {fieldData?.displayValueFn?.(currData) ?? mode === DisplayMode.DISPLAY ? (
        <span>{displayData}</span>
      ) : (
        <ModelFormInput field={field} fieldData={fieldData} />
      )}
    </div>
  );
};

export default ModelFormField;
