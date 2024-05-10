import { ComponentProps } from 'react';

import { ModelIndexCreateButton } from './ModelIndexCreateButton';
import { useModelIndex } from './useModelIndex';

export interface ModelIndexTitleProps extends ComponentProps<'h2'> {}

export const ModelIndexTitle = ({
  children,
  ...props
}: ModelIndexTitleProps) => {
  const { selected: title } = useModelIndex((state) => state.title);
  return title ? (
    <h2
      className="flex items-end justify-between w-full text-left font-semibold text-4xl whitespace-nowrap mb-2"
      {...props}
    >
      {children === undefined ? (
        <>
          <span>{title}</span>
          <ModelIndexCreateButton />
        </>
      ) : (
        children
      )}
    </h2>
  ) : null;
};
