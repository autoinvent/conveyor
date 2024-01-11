import { ReactNode } from 'react';

import { BaseComponentProps, ModelField } from '../types';
import { getFieldName } from '../utils';
import Slot from './Slot';

interface ModelTableCellProps extends BaseComponentProps {
  field: ModelField;
  children?: ReactNode;
}

const ModelTableCell = ({
  field,
  children,
  id,
  className,
}: ModelTableCellProps) => {
  const fieldName = getFieldName(field);
  return (
    <Slot slotKey={fieldName}>
      <td id={id} className={className}>
        {children}
      </td>
    </Slot>
  );
};

export default ModelTableCell;
