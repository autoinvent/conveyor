import { Lens } from '@/Lenses';
import { CommonProps, WrapperProp } from '@/types';

import { TableBodyLens } from './TableBody';

export interface TableRowFallbackProps extends WrapperProp, CommonProps { }

export const TableRowFallback = ({
  children,
  id,
  className,
  style,
}: TableRowFallbackProps) => {
  return (
    <Lens lens={TableBodyLens.HAS_NO_DATA}>
      <tr id={id} className={className} style={style}>
        {children}
      </tr>
    </Lens>
  );
};
