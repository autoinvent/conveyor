import { ReactNode, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Defaults } from '../../enums';
import { PACKAGE_ABBR } from '../../package';
import { BaseProps, FieldData } from '../../types';
import ModelForm from '../ModelForm/ModelForm';
import ModelFormField from '../ModelForm/ModelFormField';

import ModelTableCrud from './ModelTableCrud';

interface ModelTableRowProps extends BaseProps {
  modelName: string;
  fields: string[];
  data: Record<string, any>;
  fieldsData?: Record<string, FieldData>;
  editable?: boolean;
  deletable?: boolean;
  children?: ReactNode;
}

const ModelTableRow = ({
  id,
  className,
  modelName,
  fields,
  data,
  fieldsData,
  editable,
  deletable,
  children,
}: ModelTableRowProps) => {
  const showCrud = editable || deletable;
  const [loading] = useState(false);
  const values = useMemo(
    () =>
      fields.reduce((currValues, fieldName) => {
        currValues[fieldName] = data[fieldName] ?? '';
        return currValues;
      }, {} as Record<string, any>),
    [fields, data],
  );
  const formMethods = useForm({ values, mode: Defaults.RHK_MODE });

  return (
    <ModelForm formMethods={formMethods} loading={loading}>
      <tr id={id} className={className}>
        {children ??
          fields.map((field) => {
            return (
              <td key={`${PACKAGE_ABBR}-table-cell-${field}`}>
                <ModelFormField
                  modelName={modelName}
                  fields={fields}
                  field={field}
                  data={data}
                  fieldData={fieldsData?.[field]}
                />
              </td>
            );
          })}
        {showCrud && !children ? (
          <td className={`${PACKAGE_ABBR}-model-table-crud-cell`}>
            <ModelTableCrud
              key={`${PACKAGE_ABBR}-table-cell-crud`}
              modelName={modelName}
              data={data}
              fields={fields}
              fieldsData={fieldsData}
              editable={editable}
              deletable={deletable}
            />
          </td>
        ) : null}
      </tr>
    </ModelForm>
  );
};

export default ModelTableRow;
