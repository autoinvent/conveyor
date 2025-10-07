import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export interface ActionsProps extends ComponentProps<'div'> {}

export const Actions = ({ className, ...props }: ActionsProps) => {
  return <div className={cn('space-x-2', className)} {...props} />;
};
