import { ReactNode, useContext } from 'react';

import { ModelDataProvider } from '../__contexts__/ModelDataContext';
import { ModelFieldDisplaysProvider } from '../__contexts__/ModelFieldDisplaysContext';
import { TableDataContext } from '../__contexts__/TableDataContext';
import { BaseComponentProps } from '../__types';

interface ModelTableBodyProps extends BaseComponentProps {
  children: ReactNode;
}

// Table Body that repeats the content (children) per row of data and preps the
// ModelDataProvider for each row to use their correspondant data
const ModelTableBody = ({ children, id, className }: ModelTableBodyProps) => {
  const tableData = useContext(TableDataContext);
  return (
    <tbody id={id} className={className}>
      {tableData.map((rowData, index) => (
        <ModelFieldDisplaysProvider key={index}>
          <ModelDataProvider value={rowData}>{children}</ModelDataProvider>
        </ModelFieldDisplaysProvider>
      ))}
    </tbody>
  );
};

export default ModelTableBody;
