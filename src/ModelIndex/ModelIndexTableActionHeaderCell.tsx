import { HTMLAttributes } from 'react';

export interface ModelIndexTableActionHeaderCellProps
  extends HTMLAttributes<HTMLTableCellElement> {}

export const ModelIndexTableActionHeaderCell = ({
  children,
  ...props
}: ModelIndexTableActionHeaderCellProps) => {
  return <th {...props}>{children === undefined ? null : children}</th>;
};
