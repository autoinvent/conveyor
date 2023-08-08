import { useContext } from "react";

import { ConveyorContext } from "../../contexts/ConveyorContext";
import { BaseProps, FieldData } from "../../types";
import { getAvailableKeys, gqlTypeToFlexType } from "../../utils/gqlRequest";
import Link from "../commons/Link";
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
