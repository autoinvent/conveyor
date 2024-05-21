import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ModelIndexCreateButton } from './ModelIndexCreateButton';
import { useModelIndex } from './useModelIndex';

export interface ModelIndexTitleProps extends ComponentProps<'h2'> {}

export const ModelIndexTitle = ({
  children,
  className,
  ...props
}: ModelIndexTitleProps) => {
  const { selected: title } = useModelIndex((state) => state.title);
  return title || children ? (
    <h2
      className={twMerge(
        'flex items-end justify-between w-full text-left font-semibold text-4xl whitespace-nowrap mb-2',
        className,
      )}
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
