import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useModelFormStore } from './useModelFormStore';

export interface ModelFormTitleProps extends ComponentProps<'h2'> {}

export const ModelFormTitle = ({
  children,
  className,
  ...props
}: ModelFormTitleProps) => {
  const title = useModelFormStore((state) => state.title);
  return (
    <h2
      className={twMerge(
        'mb-2 flex items-end text-start font-semibold text-4xl',
        className,
      )}
      {...props}
    >
      {children === undefined ? (
        <>
          <span className="grow">{title}</span>
        </>
      ) : (
        children
      )}
    </h2>
  );
};
