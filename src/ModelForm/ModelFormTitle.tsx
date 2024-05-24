import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { useModelForm } from './useModelForm';

export interface ModelFormTitleProps extends ComponentProps<'h2'> {}

export const ModelFormTitle = ({
  children,
  className,
  ...props
}: ModelFormTitleProps) => {
  const { selected: title } = useModelForm((state) => state.title);
  return title || children ? (
    <h2
      className={twMerge(
        'flex items-end justify-between w-full text-left font-semibold text-4xl whitespace-nowrap mb-2',
        className,
      )}
      {...props}
    >
      {children === undefined ? title : children}
    </h2>
  ) : null;
};
