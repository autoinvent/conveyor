import { ReactNode } from 'react';

import { BaseComponentProps, Field } from '../types';
import { getFieldName } from '../utils';
import Slot from './Slot';

interface ModelTableHeaderProps extends BaseComponentProps {
  field: Field;
  children?: ReactNode;
}

const ModelTableHeader = ({
  field,
  children,
  id,
  className,
}: ModelTableHeaderProps) => {
  const fieldName = getFieldName(field);
  return (
    <Slot slotKey={fieldName}>
      <th id={id} className={className}>
        {children}
      </th>
    </Slot>
  );
};

export default ModelTableHeader;
