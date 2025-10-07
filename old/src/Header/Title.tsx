import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export interface TitleProps extends ComponentProps<'h2'> {
  Heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Title = ({ Heading = 'h2', className, ...props }: TitleProps) => {
  return (
    <Heading
      className={cn('font-bold text-4xl tracking-tight', className)}
      {...props}
    />
  );
};
