import { useEffect } from 'react';

import { useData } from '@/Data';
import { CommonProps, WrapperProp } from '@/types';

export interface TableCellProps extends WrapperProp, CommonProps {
  columnId: string;
}

export const TableCell = ({
  columnId,
  children,
  id,
  className,
  style,
}: TableCellProps) => {
  return null;
};
