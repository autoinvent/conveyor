import { ReactNode, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  DisplayKeyProvider,
  DisplayKeys,
} from '../__contexts__/DisplayKeyContext';
import { ModelDataProvider } from '../__contexts__/ModelDataContext';
import { ModelTableContext } from '../__contexts__/ModelTableContext';
import { SlotsProvider } from '../__contexts__/SlotsContext';
import { BaseComponentProps } from '../__types';
import { getFieldName } from '../__utils__';
import DefaultDisplayValue from './DefaultDisplayValue';
import DefaultDisplayInput from './DefaultDisplayInput';

interface ModelTableBodyProps extends BaseComponentProps {
  displayKey?: string;
  children: ReactNode;
}

// Table Body that repeats the content (children) per row of data and preps the
// ModelDataProvider for each row to use their correspondant data
const ModelTableBody = ({
  displayKey = DisplayKeys.VALUE,
  children,
  id,
  className,
}: ModelTableBodyProps) => {
  const { fields, tableData } = useContext(ModelTableContext);
  return (
    <tbody id={id} className={className}>
      {tableData.map((rowData, index) => {
        const slots = Object.fromEntries(
          fields.map((field) => [
            getFieldName(field),
            <>
              <DefaultDisplayValue field={field} />
              <DefaultDisplayInput field={field} />
            </>,
          ]),
        );
        const formMethods = useForm({ values: rowData, mode: 'onChange' });
        return (
          <SlotsProvider key={index} initialValue={slots}>
            <DisplayKeyProvider value={displayKey}>
              <ModelDataProvider value={rowData}>
                <FormProvider {...formMethods}>{children}</FormProvider>
              </ModelDataProvider>
            </DisplayKeyProvider>
          </SlotsProvider>
        );
      })}
    </tbody>
  );
};

export default ModelTableBody;
