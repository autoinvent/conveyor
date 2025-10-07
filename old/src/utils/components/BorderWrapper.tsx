import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export interface BorderWrapperProps {
  bordered: boolean;
  className?: string;
  children?: ReactNode;
}
export const BorderWrapper = ({
  bordered,
  className,
  children,
}: BorderWrapperProps) => {
  return bordered ? (
    <div className={cn('min-h-0 rounded-md border', className)}>{children}</div>
  ) : (
    children
  );
};
