import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { humanizeText } from '@/utils';

import { ModelIndexCreateButton } from './ModelIndexCreateButton';
import { useModelIndexStore } from './useModelIndexStore';

export interface ModelIndexTitleProps extends ComponentProps<'h2'> {}

export const ModelIndexTitle = ({
  children,
  className,
  ...props
}: ModelIndexTitleProps) => {
  const model = useModelIndexStore((state) => state.model);
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
          <span className="grow">{humanizeText(model)}</span>
          <ModelIndexCreateButton />
        </>
      ) : (
        children
      )}
    </h2>
  );
};
