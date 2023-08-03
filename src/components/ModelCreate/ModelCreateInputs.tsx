import { PACKAGE_ABBR } from "../../package";
import { BaseProps, FieldData } from "../../types";
import { humanizeText } from "../../utils/common";
import ModelFormInput from "../ModelForm/ModelFormInput";

interface ModelCreateInputsProps extends BaseProps {
  fields: string[];
  fieldsData?: Record<string, FieldData>;
}

const ModelCreateInputs = ({
  id,
  className,
  fields,
  fieldsData,
}: ModelCreateInputsProps) => {
  return (
    <div id={id} className={className}>
      {fields.map((field) => {
        const fieldData = fieldsData?.[field];
        const displayLabelFn = fieldData?.displayLabelFn || humanizeText;
        return (
          <label key={`${PACKAGE_ABBR}-create-form-group-${field}`}>
            {`${displayLabelFn(field)}${fieldData?.required ? "*" : ""}`}
            <ModelFormInput field={field} fieldData={fieldData} />
          </label>
        );
      })}
    </div>
  );
};

export default ModelCreateInputs;
