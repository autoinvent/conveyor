import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { ModelIndexSettings } from './ModelIndexSettings';
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
      className={cn(
        'mb-2 flex items-end text-start font-semibold text-4xl',
        className,
      )}
      {...props}
    >
      {children === undefined ? (
        <>
          <span className="grow">{title}</span>
          <ModelIndexSettings />
        </>
      ) : (
        children
      )}
    </h2>
  );
};
