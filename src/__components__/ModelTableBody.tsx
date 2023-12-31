import { ReactNode, useContext } from 'react';

import { ModelDataProvider } from '../__contexts__/ModelDataContext';
import { TableDataContext } from '../__contexts__/TableDataContext';
import { ModelData } from '../__types';

interface ModelTableBodyProps {
  children: ReactNode;
}

const ModelTableBody = ({ children }: ModelTableBodyProps) => {
  const tableDataStr = useContext(TableDataContext);
  const tableData: ModelData[] = JSON.parse(tableDataStr);
  return (
    <tbody>
      {tableData.map((rowData, index) => (
        <ModelDataProvider key={index} value={rowData}>{children}</ModelDataProvider>
      ))}
    </tbody>
  );
};

export default ModelTableBody;
