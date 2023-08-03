import { Fragment } from "react";

import { BaseProps, FieldData } from "../../types";
import ModelFormField from "../ModelForm/ModelFormField";
import { PACKAGE_ABBR } from "../../package";
import { humanizeText } from "../../utils/common";

interface ModelDetailFieldsProps extends BaseProps {
  modelName: string;
  fields: string[];
  data: Record<string, any>;
  fieldsData?: Record<string, FieldData>;
}

const ModelDetailFields = ({
  id,
  className,
  modelName,
  fields,
  data,
  fieldsData,
}: ModelDetailFieldsProps) => {
  return (
    <dl id={id} className={className}>
      {fields.map((field) => {
        const displayLabelFn =
          fieldsData?.[field]?.displayLabelFn || humanizeText;
        return !fieldsData?.[field]?.related?.many ? (
          <Fragment key={`${PACKAGE_ABBR}-detail-field-${field}`}>
            <dt>{displayLabelFn(field)}</dt>
            <dd>
              <ModelFormField
                modelName={modelName}
                field={field}
                data={data}
                fieldData={fieldsData?.[field]}
              />
            </dd>
          </Fragment>
        ) : null;
      })}
    </dl>
  );
};

export default ModelDetailFields;
