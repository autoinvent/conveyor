import { HTMLAttributes } from 'react';

import { humanizeText } from '@/utils';

import { useModelIndex } from './useModelIndex';

export interface ModelIndexTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {}

export const ModelIndexTitle = ({
  children,
  ...props
}: ModelIndexTitleProps) => {
  const { selected } = useModelIndex((state) => state.title);
  const title = humanizeText(selected);
  return selected ? (
    <h2 {...props}>{children === undefined ? title : children}</h2>
  ) : null;
};
