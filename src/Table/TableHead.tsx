import { CommonProps, WrapperProp } from '@/types';

export interface TableHeadProps extends WrapperProp, CommonProps {}

export const TableHead = ({
  children,
  id,
  className,
  style,
}: TableHeadProps) => {
  return (
    <thead id={id} className={className} style={style}>
      {children}
    </thead>
  );
};
