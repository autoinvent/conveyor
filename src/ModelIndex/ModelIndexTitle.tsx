import { HTMLAttributes } from 'react';

import { humanizeText } from '@/utils';

import { useModelIndex } from './useModelIndex';

export interface ModelIndexTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export const ModelIndexTitle = ({
  children,
  ...props
}: ModelIndexTitleProps) => {
  const { selected: model } = useModelIndex((state) => state.model);
  const modelDisplayName = humanizeText(model);
  return (
    <h2 {...props}>{children === undefined ? modelDisplayName : children}</h2>
  );
};
