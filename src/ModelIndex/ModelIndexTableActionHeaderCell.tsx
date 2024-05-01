import { ComponentProps } from 'react';

export interface ModelIndexTableActionHeaderCellProps
  extends ComponentProps<"th"> {}

export const ModelIndexTableActionHeaderCell = ({
  children,
  ...props
}: ModelIndexTableActionHeaderCellProps) => {
  return <th {...props}>{children === undefined ? null : children}</th>;
};
