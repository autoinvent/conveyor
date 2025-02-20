import type { ComponentProps } from 'react';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = ({ children, ...htmlProps }: TableBodyProps) => {
  return <tbody {...htmlProps}>{children}</tbody>;
};
