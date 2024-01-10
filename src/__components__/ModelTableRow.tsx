import { ReactNode, useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  DisplayKeyProvider,
  DisplayKeys,
} from '../__contexts__/DisplayKeyContext';
import { ModelFieldDisplaysContext } from '../__contexts__/ModelFieldDisplaysContext';
import { ModelEditableContext } from '../__contexts__/ModelEditableContext';
import { ModelFieldsContext } from '../__contexts__/ModelFieldsContext';
import useModelData from '../__hooks__/useModelData';
import { BaseComponentProps } from '../__types';
import { getFieldName } from '../__utils__';
import ModelActionButtons from './ModelActionButtons';

interface ModelTableRowProps extends BaseComponentProps {
  initialDisplayKey?: string;
  children?: ReactNode;
}

const ModelTableRow = ({
  initialDisplayKey = DisplayKeys.VALUE,
  children,
  id,
  className,
}: ModelTableRowProps) => {
  const fields = useContext(ModelFieldsContext);
  const fieldDisplays = useContext(ModelFieldDisplaysContext);
  const editable = useContext(ModelEditableContext);
  const values = useModelData();
  const formMethods = useForm({ values, mode: 'onChange' });

  return (
    <tr id={id} className={className}>
      <DisplayKeyProvider initialValue={initialDisplayKey}>
        <FormProvider {...formMethods}>
          {fields.map((field, index) => (
            <td key={index}>{fieldDisplays[getFieldName(field)]}</td>
          ))}
          <td>fieldDisplays</td>
          {children}
        </FormProvider>
      </DisplayKeyProvider>
    </tr>
  );
};

export default ModelTableRow;
