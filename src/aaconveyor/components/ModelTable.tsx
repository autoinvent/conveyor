import { ReactNode } from 'react';
import { Table } from 'react-bootstrap';

import { BaseComponentProps } from '../types';
import ModelTableBody from './ModelTableBody';
import ModelTableHead from './ModelTableHead';
import ModelTableRow from './ModelTableRow';

interface ModelTableProps extends BaseComponentProps {
  children?: ReactNode;
}

const ModelTable = ({
  children,
  id,
  className,
}: ModelTableProps) => {
  return (
    <Table id={id} className={className} striped bordered hover>
      {children || (
        <>
          <ModelTableHead />
          <ModelTableBody>
            <ModelTableRow />
          </ModelTableBody>
        </>
      )}
    </Table>
  );
};

export default ModelTable;
