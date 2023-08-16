import { useContext } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { BaseProps, FieldData } from "../../types";
import { getAvailableKeys, gqlTypeToFlexType } from "../../utils/gqlRequest";
import ModelNav from "../ModelNav";
import Checkbox from "../commons/Checkbox";
import { InputTypes } from "../commons/FlexibleInput";

interface ModelFormValueProps extends BaseProps {
  modelName: string;
  fields: string[];
  field: string;
  data: Record<string, any>;
  fieldData?: FieldData;
}

const ModelFormValue = ({
  id,
  className,
  modelName,
  fields,
  field,
  data,
  fieldData,
}: ModelFormValueProps) => {
  const { primaryKey, secondaryKeys } = useContext(ConveyorContext);
  const type = gqlTypeToFlexType(fieldData?.type ?? "String");
  const currData = data?.[field];
  const related = fieldData?.related;
  let displayData = currData;
  const keyFallbacks = [primaryKey].concat(secondaryKeys ?? []);
  if (related) {
    const availableKeys = getAvailableKeys(related.fields ?? [], keyFallbacks);
    if (!related.many) {
      displayData = displayData ? [displayData] : [];
    }
    displayData = displayData?.map(
      (val: Record<string, any>, index: number) => (
        <ModelNav
          key={index}
          modelName={related?.modelName}
          modelId={val[primaryKey]}
        >
          <a>
            {val?.[availableKeys.at(1) ?? primaryKey]}
            {index !== displayData?.length - 1 && ","}
          </a>
        </ModelNav>
      )
    );
  } else if (getAvailableKeys(fields, keyFallbacks).includes(field)) {
    displayData = (
      <ModelNav modelName={modelName} modelId={data[primaryKey]}>
        <a href="#">{currData}</a>
      </ModelNav>
    );
  } else if (type === InputTypes.BOOLEAN) {
    displayData = <Checkbox value={currData} disabled={true} />;
  }

  return (
    <span id={id} className={className}>
      {displayData}
    </span>
  );
};

export default ModelFormValue;
