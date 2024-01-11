import { ReactNode, useContext } from 'react';

import { ModelDataProvider } from '../contexts/ModelDataContext';
import { ModelTableContext } from '../contexts/ModelTableContext';
import { BaseComponentProps } from '../types';
import { DisplayKeyProvider } from '../contexts/DisplayKeyContext';

interface ModelTableBodyProps extends BaseComponentProps {
  children?: ReactNode;
}

// Table Body that repeats the content (children) per row of data and preps the
// ModelDataProvider for each row to use their correspondant data
const ModelTableBody = ({ children, id, className }: ModelTableBodyProps) => {
  const { tableData, initialDisplayKey } = useContext(ModelTableContext);
  return (
    <tbody id={id} className={className}>
      {tableData.map((rowData, index) => {
        return (
          <ModelDataProvider key={index} value={rowData}>
            <DisplayKeyProvider value={initialDisplayKey}>
              {children}
            </DisplayKeyProvider>
          </ModelDataProvider>
        );
      })}
    </tbody>
  );
};

export default ModelTableBody;
