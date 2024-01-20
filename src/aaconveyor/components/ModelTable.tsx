import { ReactNode } from 'react';
import { Table } from 'react-bootstrap';

import {
  MODEL_TABLE_SLOT,
  MODEL_TABLE_PAGINATION_SLOT,
  MODEL_HEADING_SLOT,
} from '../constants';
import { SlotsProvider } from '../contexts/SlotsContext';
import { BaseComponentProps } from '../types';
import ModelHeading from './ModelHeading';
import ModelTableBody from './ModelTableBody';
import ModelTableHead from './ModelTableHead';
import ModelTablePagination from './ModelTablePagination';
import ModelTableRow from './ModelTableRow';
import ModelTitle from './ModelTitle';
import Slot from './Slot';

interface ModelTableProps extends BaseComponentProps {
  children?: ReactNode;
}

const ModelTable = ({ children, id, className }: ModelTableProps) => {
  return (
    <SlotsProvider
      slotKeys={[
        MODEL_HEADING_SLOT,
        MODEL_TABLE_SLOT,
        MODEL_TABLE_PAGINATION_SLOT,
      ]}
    >
      <Slot slotKey={MODEL_TABLE_SLOT}>
        <Table id={id} className={className} striped bordered hover>
          {children !== undefined ? (
            children
          ) : (
            <>
              <ModelHeading>
                <ModelTitle />
                <button>filter btn</button>
              </ModelHeading>
              <ModelTableHead />
              <ModelTableBody>
                <ModelTableRow />
              </ModelTableBody>
              <ModelTablePagination />
            </>
          )}
        </Table>
      </Slot>
    </SlotsProvider>
  );
};

export default ModelTable;
