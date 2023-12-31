import { ReactNode } from 'react';
import { Table } from 'react-bootstrap';

import { TableDataProvider } from '../__contexts__/TableDataContext';
import { BaseComponentProps, ModelField, ModelData } from '../__types';
import ModelTableCell from './ModelTableCell';
import ModelTableBody from './ModelTableBody';
import ModelTableRow from './ModelTableRow';

interface ModelTableProps extends BaseComponentProps {
  data: ModelData[];
  fields?: ModelField[];
  children?: ReactNode;
}

const ModelTable = ({
  data,
  fields,
  children,
  id,
  className,
}: ModelTableProps) => {
  return (
    <Table id={id} className={className} striped bordered hover>
      <TableDataProvider value={data}>
        {fields && !children ? (
          <>
            <ModelTableBody>
              <ModelTableRow>
                {fields.map((field, index) => (
                  <ModelTableCell key={index} field={field} />
                ))}
              </ModelTableRow>
            </ModelTableBody>
          </>
        ) : (
          children
        )}
      </TableDataProvider>
    </Table>
  );
};

export default ModelTable;
