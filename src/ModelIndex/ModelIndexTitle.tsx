import { CommonProps, WrapperProp } from '@/types';

export interface ModelIndexTitleProps extends CommonProps, WrapperProp {}

export const ModelIndexTitle = ({
  children,
  id,
  className,
  style,
}: ModelIndexTitleProps) => {
  return (
    <h2 id={id} className={className} style={style}>
      {children}
    </h2>
  );
};
