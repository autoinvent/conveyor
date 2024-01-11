import { ReactNode, useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { DisplayKeyProvider, DisplayKeys } from '../contexts/DisplayKeyContext';
import { ModelDataProvider } from '../contexts/ModelDataContext';
import { ModelTableContext } from '../contexts/ModelTableContext';
import { BaseComponentProps } from '../types';

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
  const { tableData } = useContext(ModelTableContext);
  return (
    <tbody id={id} className={className}>
      {tableData.map((rowData, index) => {
        const formMethods = useForm({ values: rowData, mode: 'onChange' });
        return (
          <DisplayKeyProvider key={index} value={displayKey}>
            <ModelDataProvider value={rowData}>
              <FormProvider {...formMethods}>{children}</FormProvider>
            </ModelDataProvider>
          </DisplayKeyProvider>
        );
      })}
    </tbody>
  );
};

export default ModelTableBody;
