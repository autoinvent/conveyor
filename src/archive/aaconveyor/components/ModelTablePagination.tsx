import { ReactNode } from 'react';

import { MODEL_TABLE_PAGINATION_SLOT } from '../constants';
import { BaseComponentProps } from '../types';
import Slot from './Slot';

interface ModelTablePaginationProps extends BaseComponentProps {
  children?: ReactNode;
}

const ModelTablePagination = ({
  children,
  id,
  className,
}: ModelTablePaginationProps) => {
  return (
    <Slot slotKey={MODEL_TABLE_PAGINATION_SLOT}>
      <div>1 2 3 4 5</div>
    </Slot>
  );
};

export default ModelTablePagination;
