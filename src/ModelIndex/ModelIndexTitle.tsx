import { ComponentProps } from 'react';

import { useModelIndex } from './useModelIndex';

export interface ModelIndexTitleProps extends ComponentProps<'h2'> {}

export const ModelIndexTitle = ({
  children,
  ...props
}: ModelIndexTitleProps) => {
  const { selected: title } = useModelIndex((state) => state.title);
  return title ? (
    <h2 {...props}>{children === undefined ? title : children}</h2>
  ) : null;
};
