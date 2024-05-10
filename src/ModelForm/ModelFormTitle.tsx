import { ComponentProps } from 'react';

import { useModelForm } from './useModelForm';

export interface ModelFormTitleProps extends ComponentProps<'h2'> {}

export const ModelFormTitle = ({ children, ...props }: ModelFormTitleProps) => {
  const { selected: title } = useModelForm((state) => state.title);
  return title ? (
    <h2
      className="w-full text-left font-semibold text-4xl whitespace-nowrap m-2"
      {...props}
    >
      {children === undefined ? title : children}
    </h2>
  ) : null;
};
