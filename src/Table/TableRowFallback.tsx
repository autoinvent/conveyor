import { CommonProps, WrapperProp } from '@/types';

export interface TableRowFallbackProps extends WrapperProp, CommonProps {}

export const TableRowFallback = ({
  children,
  id,
  className,
  style,
}: TableRowFallbackProps) => {
  return (
    <tr id={id} className={className} style={style}>
      {children}
    </tr>
  );
};
