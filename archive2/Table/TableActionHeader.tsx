import { ReactNode } from 'react';

import { Slot } from '@/Slots';
import { BaseComponentProps } from '@/types';

export const TABLE_ACTION_HEADER_SLOT = 'table-action-header-slot';

export interface TableActionHeaderProps extends BaseComponentProps {
  children?: ReactNode;
}

export const TableActionHeader = ({
  children,
  id,
  className,
  style,
}: TableActionHeaderProps) => {
  return (
    <Slot slotKey={TABLE_ACTION_HEADER_SLOT}>
      <th id={id} className={className} style={style}>
        {children}
      </th>
    </Slot>
  );
};
