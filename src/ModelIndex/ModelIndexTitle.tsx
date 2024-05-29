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
        'm-2 mr-0 flex items-end justify-between whitespace-nowrap text-left font-semibold text-4xl',
        className,
      )}
      {...props}
    >
      {children === undefined ? (
        <>
          <span>{humanizeText(model)}</span>
          <ModelIndexCreateButton />
        </>
      ) : (
        children
      )}
    </h2>
  );
};
