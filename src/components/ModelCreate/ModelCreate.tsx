import { FC, memo } from "react";

import { PACKAGE_ABBR } from "../../package";
import { BaseProps, FieldData } from "../../types";
import { humanizeText } from "../../utils/common";
import ModelFormInput from "../ModelForm/ModelFormInput";

import ModelCreateForm from "./ModelCreateForm";
import ModelCreateCrud from "./ModelCreateCrud";

interface ModelCreateProps extends BaseProps {
  modelName: string;
  fields: string[];
  title?: string;
  fieldsData?: Record<string, FieldData>;
}

const ModelCreate = ({
  id,
  className,
  modelName,
  fields,
  title = `Create ${humanizeText(modelName)}`,
  fieldsData,
}: ModelCreateProps) => {
  return (
    <div id={id} className={className}>
      <div className="mb-4">
        <h1>{title}</h1>
        <div>* Indicates a required field</div>
      </div>
      <ModelCreateForm fields={fields}>
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
        <ModelCreateCrud
          modelName={modelName}
          fields={fields}
          fieldsData={fieldsData}
        />
      </ModelCreateForm>
    </div>
  );
};

export default memo(ModelCreate) as FC<ModelCreateProps>;
