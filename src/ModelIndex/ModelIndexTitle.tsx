import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ModelIndexCreateButton } from './ModelIndexCreateButton';
import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexTitleProps extends ComponentProps<'h2'> {}

export const ModelIndexTitle = ({
  children,
  className,
  ...props
}: ModelIndexTitleProps) => {
  const title = useModelIndexStore((state) => state.title);
  return (
    <h2
      className={twMerge(
        'mb-2 flex items-end font-semibold text-4xl',
        className,
      )}
      {...props}
    >
      {children === undefined ? (
        <>
          <span className="grow">{title}</span>
          <ModelIndexCreateButton />
        </>
      ) : (
        children
      )}
    </h2>
  );
};
