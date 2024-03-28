import { CommonProps, WrapperProp } from '@/types';

import { TableHeaderRow } from './TableHeaderRow';

export interface TableHeadProps extends WrapperProp, CommonProps { }

export const TableHead = ({
  children,
  id,
  className,
  style,
}: TableHeadProps) => {
  return (
    <thead id={id} className={className} style={style}>
      {children === undefined ? <TableHeaderRow /> : children}
    </thead>
  );
};
