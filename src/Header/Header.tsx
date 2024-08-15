import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { Actions } from './Actions';
import { Title } from './Title';

export interface HeaderProps extends ComponentProps<'div'> {}

export const Header = Object.assign(
  ({ className, ...props }: HeaderProps) => {
    return (
      <div
        className={cn(
          'flex items-end justify-between gap-2 whitespace-nowrap py-2',
          className,
        )}
        {...props}
      />
    );
  },
  {
    Title,
    Actions,
  },
);
