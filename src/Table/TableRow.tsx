import { Lens } from '@/Lenses';
import { CommonProps, WrapperProp } from '@/types';

import { TableBodyLens } from './TableBody';

export interface TableRowProps extends WrapperProp, CommonProps {}

export const TableRow = ({ children, id, className, style }: TableRowProps) => {
  return (
    <Lens lens={TableBodyLens.HAS_DATA}>
      <tr id={id} className={className} style={style}>
        {children}
      </tr>
    </Lens>
  );
};
