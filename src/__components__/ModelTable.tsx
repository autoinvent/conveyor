import { ReactNode, useMemo } from 'react';
import { Table } from 'react-bootstrap';

import { TableDataProvider } from '../__contexts__/TableDataContext';
import { ModelEditableProvider } from '../__contexts__/ModelEditableContext';
import { ModelFieldsProvider } from '../__contexts__/ModelFieldsContext';
import { BaseComponentProps, ModelField, ModelData } from '../__types';
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
  const tableData = useMemo(() => data, [JSON.stringify(data)]);
  const tableFields = useMemo(() => fields, [JSON.stringify(fields)]);
  return (
    <Table id={id} className={className} striped bordered hover>
      <ModelEditableProvider value={editable}>
        <ModelFieldsProvider value={tableFields}>
          <TableDataProvider value={tableData}>
            {children || (
              <ModelTableBody>
                <ModelTableRow />
              </ModelTableBody>
            )}
          </TableDataProvider>
        </ModelFieldsProvider>
      </ModelEditableProvider>
    </Table>
  );
};

export default ModelTable;
