import { ReactNode } from 'react';
import { Table } from 'react-bootstrap';

import { ModelTableProvider } from '../contexts/ModelTableContext';
import { BaseComponentProps, ModelField, ModelData } from '../types';
import ModelTableBody from './ModelTableBody';
import ModelTableRow from './ModelTableRow';

interface ModelTableProps extends BaseComponentProps {
  data: ModelData[];
  fields: ModelField[];
  editable?: boolean;
  children?: ReactNode;
}

const ModelTable = ({
  data,
  fields,
  children,
  editable = true,
  id,
  className,
}: ModelTableProps) => {
  return (
    <Table id={id} className={className} striped bordered hover>
      <ModelTableProvider value={{ fields, tableData: data, editable }}>
        {children || (
          <ModelTableBody>
            <ModelTableRow />
          </ModelTableBody>
        )}
      </ModelTableProvider>
    </Table>
  );
};

export default ModelTable;
