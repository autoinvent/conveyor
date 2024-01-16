import { ReactNode } from 'react';
import { Table } from 'react-bootstrap';

import { DisplayKeys } from '../contexts/DisplayKeyContext';
import { ModelTableProvider } from '../contexts/ModelTableContext';
import { BaseComponentProps, ModelField, ModelData } from '../types';
import ModelTableBody from './ModelTableBody';
import ModelTableHead from './ModelTableHead'
import ModelTableRow from './ModelTableRow';

interface ModelTableProps extends BaseComponentProps {
  data: ModelData[];
  fields: ModelField[];
  editable?: boolean;
  initialDisplayKey?: string;
  onSave?: Function;
  onDelete?: Function;
  onCreate?: Function;
  onSort?: Function;
  onPaginate?: Function;
  children?: ReactNode;
}

const ModelTable = ({
  data,
  fields,
  children,
  editable = true,
  initialDisplayKey = DisplayKeys.VALUE,
  id,
  className,
}: ModelTableProps) => {
  return (
    <Table id={id} className={className} striped bordered hover>
      <ModelTableProvider
        value={{ fields, tableData: data, editable, initialDisplayKey }}
      >
        {children || (
          <>
            <ModelTableHead />
            <ModelTableBody>
              <ModelTableRow />
            </ModelTableBody>
          </>
        )}
      </ModelTableProvider>
    </Table>
  );
};

export default ModelTable;
