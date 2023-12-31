import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  DisplayKeyProvider,
  DisplayKeys,
} from '../__contexts__/DisplayKeyContext';
import useModelData from '../__hooks__/useModelData';
import { BaseComponentProps } from '../__types';

interface ModelTableRowProps extends BaseComponentProps {
  initialDisplayKey?: string;
  children: ReactNode;
}

const ModelTableRow = ({
  initialDisplayKey = DisplayKeys.VALUE,
  children,
  id,
  className,
}: ModelTableRowProps) => {
  const values = useModelData();
  const formMethods = useForm({ values, mode: 'onChange' });

  return (
    <tr id={id} className={className}>
      <DisplayKeyProvider initialValue={initialDisplayKey}>
        <FormProvider {...formMethods}>{children}</FormProvider>
      </DisplayKeyProvider>
    </tr>
  );
};

export default ModelTableRow;
