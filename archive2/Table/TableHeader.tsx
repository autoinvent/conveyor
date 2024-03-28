import { ReactNode } from 'react';

import { Slot } from '@/Slots';
import { BaseComponentProps, Field } from '@/types';
import { getFieldName } from '@/utils';

export interface TableHeaderProps extends BaseComponentProps {
  field: Field;
  children?: ReactNode;
}

export const TableHeader = ({
  field,
  children,
  id,
  className,
  style,
}: TableHeaderProps) => {
  const fieldName = getFieldName(field);
  return (
    <Slot slotKey={fieldName}>
      <th id={id} className={className} style={style}>
        {children}
      </th>
    </Slot>
  );
};
